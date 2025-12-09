export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-space-5 py-space-6 text-center font-serif">
      <h1
        className="mb-space-6 text-[length:var(--text-large)] font-normal tracking-wide text-foreground"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        Contact
      </h1>

      <div className="mx-auto max-w-lg leading-relaxed text-foreground">
        <p className="mb-space-6">
          当サイトに関するお問い合わせ、ご意見、バグ報告等は、
          <br />
          以下のいずれかの方法でご連絡ください。
        </p>

        <div className="space-y-space-5">
          {/* Email Card */}
          <a
            href="mailto:contact@24bitcolors.com"
            className="group flex w-full flex-col items-center border border-foreground p-space-5 transition-all hover:bg-foreground hover:text-background"
          >
            <div className="mb-space-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-foreground transition-colors group-hover:stroke-background"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="mb-space-1 text-[length:var(--text-base)] tracking-wider text-muted-foreground group-hover:text-background">
              EMAIL
            </span>
            <span
              className="text-[length:var(--text-medium)] font-medium tracking-wide"
              style={{ fontFamily: '"SF Mono", monospace' }}
            >
              contact@24bitcolors.com
            </span>
          </a>

          {/* X (Twitter) Card */}
          {/* <a
            href="https://x.com/yuget"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full flex-col items-center border border-foreground p-space-5 transition-all hover:bg-foreground hover:text-background"
          >
            <div className="mb-space-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground transition-colors group-hover:fill-background"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="mb-space-1 text-[length:var(--text-base)] tracking-wider text-muted-foreground group-hover:text-background">
              X (Twitter)
            </span>
            <span
              className="text-[length:var(--text-medium)] font-medium tracking-wide"
              style={{ fontFamily: '"SF Mono", monospace' }}
            >
              @yuget
            </span>
          </a> */}
        </div>

        <p className="mt-space-6 text-[length:var(--text-micro)] text-muted-foreground">
          ※
          お問い合わせの内容によっては、返信にお時間をいただく場合や返信できない場合がございます。
        </p>
      </div>
    </div>
  );
}
