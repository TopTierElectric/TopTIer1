import Link from "next/link";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: "flex", gap: 8, listStyle: "none", padding: 0 }}>
        {items.map((c, i) => (
          <li key={c.href}>
            {i > 0 ? <span aria-hidden="true">/</span> : null}{" "}
            <Link href={c.href}>{c.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
