import { whatsappHref } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message ARK Hotels on WhatsApp"
      className="fixed z-40 bottom-5 right-5 lg:bottom-8 lg:right-8 group"
    >
      <div className="flex items-center gap-3 bg-ink text-paper rounded-[2px] pl-3 pr-5 py-3 shadow-[0_24px_48px_-28px_rgba(27,26,23,0.55)] hover:bg-brass-deep transition-colors">
        <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#25D366]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-4 w-4 fill-white"
            aria-hidden
          >
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.795 1.23 1.82 2.508 3.41 4.5 4.402.616.287 2.137.844 2.81.844.36 0 .547-.057.806-.188.616-.31.997-.687 1.082-1.318a.7.7 0 00.07-.357c0-.286-2.094-1.218-2.434-1.218zm-2.97-15.205C9.42 2 4 7.42 4 14.14c0 2.286.626 4.5 1.808 6.43L4 28l7.59-1.99c1.852.98 3.93 1.51 6.04 1.51 6.72 0 12.14-5.42 12.14-12.14C29.77 8.66 24.35 3.24 17.63 3.24z"/>
          </svg>
        </span>
        <span className="text-[14px] font-medium tracking-tight">
          WhatsApp the front desk
        </span>
      </div>
    </a>
  );
}
