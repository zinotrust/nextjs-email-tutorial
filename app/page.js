"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("donaldzee.ng@gmail.com")
  const [emailService, setEmailService] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(email, subject, message, emailService);

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
          email,
          emailService
        }),
      });
  
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Email Sent")
        return true
      } else {
        toast.error("Email not sent")
        return false
      }
    } catch (error) {
      console.log("Error sending email: ", error);
      //   toast.error(error?.message);
    }
  };

  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[500px] border border-blue-400 p-2">
        <form className="space-y-2" onSubmit={sendMessage}>
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Subject</Label>
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Label>Your message</Label>
          <Textarea
            placeholder="Type your message here."
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
            <Select defaultValue={emailService} value={emailService} onValueChange={(e) => setEmailService(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Email service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gmail">Gmail</SelectItem>
              <SelectItem value="resend">Resend</SelectItem>
              <SelectItem value="aws">AWS</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="default" type="submit">Button</Button>
        </form>
      </div>
    </main>
  );
}

