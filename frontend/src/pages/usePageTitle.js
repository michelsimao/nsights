import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Nsights Risk Ops` : 'Nsights Risk Ops';
  }, [title]);
}
