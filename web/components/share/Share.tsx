"use client";
import { useEffect, useState } from "react";
import {EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton }from "react-share";
import { Button } from "../ui/button";
import { Share } from "lucide-react";

export default function ShareButton({ isIcon }: { isIcon?: boolean }) {
    const [supportNativeShare, setSupportNativeShare] = useState(false);
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const title = "Check out this PG from LookAroundPG!";

    useEffect(() => {
        if (navigator.share) {
            setSupportNativeShare(true);
        }
    }, [])

    const handleNativeShare = async() => {
        try {
            await navigator.share({
                title: title,
                text: "I found this interesting:",
                url: shareUrl
            })
        } catch (error) {
            console.error("Error sharing:", error);
        }
    }

    if(supportNativeShare){
        if (isIcon){
            return (
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-16 right-4 p-2 h-10 w-10 bg-white/80 hover:bg-white`}
                  onClick={handleNativeShare}
                >
                  <Share
                    className={`h-5 w-5`}
                  />
                </Button>
            )
        }
        else {
            return (
                <Button
                onClick={handleNativeShare}
                className="w-full bg-gradient-cool text-white shadow-lg transform transition-all duration-200 hover:scale-105 hidden md:flex items-center justify-center"
                >
                <Share className="h-4 w-4 mr-2" />
                    Share
                </Button>
           )
        }
    }
    return (
    <div className="flex gap-2">
      <FacebookShareButton url={shareUrl} hashtag={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <EmailShareButton url={shareUrl} subject={title} body="Check out this PG!">
        <EmailIcon size={32} round />
      </EmailShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}