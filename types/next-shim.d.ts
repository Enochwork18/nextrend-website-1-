// Type definitions for Next.js App Router
declare module 'next/navigation' {
  export interface NextRouter {
    push(href: string, options?: { scroll?: boolean }): void;
    replace(href: string, options?: { scroll?: boolean }): void;
    prefetch(href: string): Promise<void>;
    back(): void;
    forward(): void;
    refresh(): void;
    pathname: string;
    query: Record<string, string>;
    asPath: string;
    events: {
      on(event: string, handler: (...args: any[]) => void): void;
      off(event: string, handler: (...args: any[]) => void): void;
      emit(event: string, ...args: any[]): void;
    };
  }

  export function useRouter(): NextRouter;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useParams(): Record<string, string | string[]>;
  export function useSelectedLayoutSegment(parallelRoutesKey?: string): string | null;
  export function useSelectedLayoutSegments(parallelRoutesKey?: string): string[];
  export function redirect(path: string): never;
  export function notFound(): never;
  export function permanentRedirect(path: string): never;
  export function useServerInsertedHTML(callback: () => React.ReactNode): void;
  export function useServerActionResponse(): Readonly<{
    response: Response | null;
    setResponse: (response: Response) => void;
  }>;
  export function useServerActionRequestContext<T = any>(): T | undefined;
}

// Minimal JSX shim to avoid "JSX element implicitly has type 'any'" when next-env.d.ts is ignored.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
