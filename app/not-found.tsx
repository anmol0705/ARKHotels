import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-page py-32 lg:py-48">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 font-display text-[36px] sm:text-[44px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-ink max-w-[20ch]">
        That page isn&apos;t here.
      </h1>
      <p className="mt-6 text-[18px] text-ink-soft max-w-[50ch]">
        It might have moved, or you might be looking for something else.
        The front desk can help if you call{" "}
        <a
          href={SITE.phone.tel}
          className="text-ink underline decoration-brass decoration-1 underline-offset-[6px] hover:decoration-2"
        >
          {SITE.phone.display}
        </a>
        .
      </p>
      <div className="mt-10">
        <ButtonPrimary href="/">Back to the home page</ButtonPrimary>
      </div>
    </section>
  );
}

