import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-page py-16 lg:py-20 grid gap-12 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-2xl lg:text-3xl leading-tight tracking-tight text-paper">
            A clean room. A hot meal.
            <br />
            An early checkout. Handled.
          </p>
          <div className="mt-10 space-y-3 text-[14px] text-paper/80">
            <Image
              src="/images/logo/LOGO_footer.webp"
              alt="ARK Hotels"
              width={900}
              height={500}
              className="h-24 sm:h-32 lg:h-40 w-auto object-contain"
              style={{ width: "auto" }}
            />
            <p className="pt-2">{SITE.address.full}</p>
          </div>
          <div className="mt-6 space-y-1 text-[14px]">
            <p>
              <span className="text-paper/60 mr-2">Front desk</span>
              <a
                href={SITE.phone.tel}
                className="text-paper hover:text-brass transition-colors tabular-nums"
              >
                {SITE.phone.display}
              </a>
            </p>
            <p>
              <span className="text-paper/60 mr-2">WhatsApp</span>
              <a
                href={`https://wa.me/${SITE.whatsapp.e164.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper hover:text-brass transition-colors tabular-nums"
              >
                {SITE.whatsapp.display}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-paper/50 mb-4">
                {heading}
              </p>
              <ul className="space-y-3 text-[14px]">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-paper/85 hover:text-brass transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[12px] text-paper/55">
          <p>© {new Date().getFullYear()} ARK Hotels, Ranchi. All rights reserved.</p>
          <p>
            Rates exclusive of GST · Check-in 12:00 PM · Check-out 11:30 AM
          </p>
        </div>
      </div>
    </footer>
  );
}
