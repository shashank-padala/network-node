"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface MeetingRequestModalProps {
  recipientId: string;
  recipientName: string;
  recipientCalendly?: string | null;
  jobId?: string;
  startupId?: string;
  trigger?: React.ReactNode;
}

export function MeetingRequestModal({
  recipientId,
  recipientName,
  recipientCalendly,
  jobId,
  startupId,
  trigger,
}: MeetingRequestModalProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState<"virtual" | "in-person">("virtual");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to send a meeting request");
      return;
    }

    if (meetingType === "in-person" && !location.trim()) {
      setError("Location is required for in-person meetings");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("meeting_requests")
        .insert({
          requester_id: user.id,
          recipient_id: recipientId,
          job_id: jobId || null,
          startup_id: startupId || null,
          message: message || null,
          location: meetingType === "in-person" ? location : null,
          status: "pending",
        });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setMessage("");
        setLocation("");
        setMeetingType("virtual");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Calendar className="h-4 w-4 mr-2" />
      Request Meeting
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Meeting with {recipientName}</DialogTitle>
          <DialogDescription>
            Send a meeting request to connect with {recipientName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Meeting request sent successfully!
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Meeting Type *</label>
            <Select
              value={meetingType}
              onValueChange={(value) => setMeetingType(value as "virtual" | "in-person")}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="virtual">
                  Virtual {recipientCalendly && "(via Calendly)"}
                </SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
              </SelectContent>
            </Select>
            {meetingType === "virtual" && recipientCalendly && (
              <p className="text-xs text-muted-foreground">
                They have a Calendly link:{" "}
                <a
                  href={recipientCalendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {recipientCalendly}
                </a>
              </p>
            )}
          </div>

          {meetingType === "in-person" && (
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location *
              </label>
              <Input
                id="location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., NS Café, Lounge 13F, or other location"
                disabled={loading}
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message (optional)
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
              placeholder="Add a personal message..."
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}



