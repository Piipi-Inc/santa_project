import { useLayoutEffect } from 'react';
import { setupFontSize } from './shared/libs/setupFontSize';
import { ScreenSwitch } from './components/ScreenSwitch';
import { useStore } from './store';

export function App() {
  const store = useStore();

  useLayoutEffect(() => {
    const setupUi = () => {
      setTimeout(() => {
        setupFontSize();
      }, 20);
    };

    setupUi();
    store.init();

    window.addEventListener('resize', setupUi);

    return () => {
      window.removeEventListener('resize', setupUi);
    };
  });

  return (
    <div>
      <ScreenSwitch />
    </div>
  );
}
