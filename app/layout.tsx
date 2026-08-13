import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "S.I.D.E.F. — Consola de análisis",
  description: "Sistema Inteligente de Detección de Evasión Fiscal",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>
    <template dangerouslySetInnerHTML={{ __html: "<!-- THESIS: una pantalla conecta señal, relación y evidencia; evita el dashboard de tarjetas. OWN-WORLD: chrome navy mate, lienzo gris frío, selección cobalto/cian, alertas ámbar/rojo, controles rectos y tipografía sans densa. STORY: seleccionar caso, inspeccionar grafo y evidencia, ajustar criterios. FIRST VIEWPORT: barra 56px, rail 58px, cola 330px, grafo central, inspector 334px, cronología inferior. FORM: consola de investigación Palantir-adjacent aprobada; seed sidef-palantir-canon-v1. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->" }} />
    {children}
  </body></html>;
}
