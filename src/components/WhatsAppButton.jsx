import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp">
      <MessageCircle className="w-8 h-8 fill-current" />
    </a>
  );
}
