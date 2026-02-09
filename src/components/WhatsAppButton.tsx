import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello%20Osian%20Enterprise!%20I%20want%20to%20know%20more%20about%20your%20courses."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl animate-bounce-slow"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
