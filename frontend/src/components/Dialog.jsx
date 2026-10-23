import { useEffect, useRef } from 'react';
import { Modal } from '../ds/index.js';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * O `Modal` do DS com o comportamento de diálogo que ele não traz:
 * foco inicial dentro, Tab preso no diálogo, Esc fecha e o foco volta ao gatilho.
 */
export function Dialog({ children, kicker, onClose, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const trigger = document.activeElement;
    const root = ref.current?.querySelector('[role="dialog"]');
    const first = root?.querySelector('[data-autofocus]') ?? root?.querySelectorAll(FOCUSABLE)[1] ?? root;
    first?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose?.();
        return;
      }
      if (event.key !== 'Tab' || !root) return;
      const items = [...root.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const [head, tail] = [items[0], items[items.length - 1]];
      if (event.shiftKey && document.activeElement === head) {
        event.preventDefault();
        tail.focus();
      } else if (!event.shiftKey && document.activeElement === tail) {
        event.preventDefault();
        head.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
    // Só na abertura: onClose muda a cada render do pai.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <Modal kicker={kicker} onClose={onClose} title={title}>
        <div className="app-dialog-body">{children}</div>
      </Modal>
    </div>
  );
}
