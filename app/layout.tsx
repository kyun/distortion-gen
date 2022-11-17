import "~/app/layout.css";
interface Props {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: Props) {
  return (
    <html>
      <head>
        <title>Next.js 13</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
