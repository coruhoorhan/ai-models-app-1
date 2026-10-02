## 2024-03-24 - Missing ARIA label for icon-only Button
**Learning:** The `Button` component with `variant="icon-circular"` doesn't enforce or warn about missing `aria-label` when only an icon is provided. This is a critical accessibility issue for screen readers.
**Action:** The Button component should automatically add an `aria-label` prop when used as an icon-only button if the `aria-label` is not provided. In the Button component, we can use a console warning for developers if an `icon-circular` button has no `aria-label` provided, or enforce it in types.
## 2024-03-24 - Missing focus-ring and aria-label on AnimatedIcons and NotificationBell
**Learning:** Custom interactive components using `motion.button` (like AnimatedGithubIcon, AnimatedGlobeIcon, NotificationBell) frequently miss the `focus-ring` utility class and essential `aria-label`s for screen readers. This makes them inaccessible to keyboard users and screen readers.
**Action:** Always ensure `focus-ring` class is applied to all interactive elements for keyboard accessibility, and `aria-label` is provided for icon-only buttons.
