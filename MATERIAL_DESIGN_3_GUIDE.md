# Material Design 3 Implementation Guide

## 🎨 Color System

### Primary Colors
- **Primary**: Blue 600 (`--md-primary`)
- **Secondary**: Purple 600 (`--md-secondary`)
- **Tertiary**: Orange 600 (`--md-tertiary`)
- **Error**: Red 600 (`--md-error`)

### Surface Colors
- **Surface**: Main background (`--md-surface`)
- **Surface Container**: Card backgrounds (`--md-surface-container`)
- **On Surface**: Text on surfaces (`--md-on-surface`)

### Usage Examples
```css
/* Button with primary color */
.md3-button-filled {
  background-color: rgb(var(--md-primary));
  color: rgb(var(--md-on-primary));
}

/* Card with elevation */
.md3-card {
  background-color: rgb(var(--md-surface));
  box-shadow: var(--md-shadow-1);
}
```

## 📝 Typography Scale

### Display Text (Large)
- `.md3-display-large`: 3.5rem (56px)
- `.md3-display-medium`: 2.8125rem (45px)
- `.md3-display-small`: 2.25rem (36px)

### Headlines
- `.md3-headline-large`: 2rem (32px)
- `.md3-headline-medium`: 1.75rem (28px)
- `.md3-headline-small`: 1.5rem (24px)

### Titles
- `.md3-title-large`: 1.375rem (22px)
- `.md3-title-medium`: 1rem (16px)
- `.md3-title-small`: 0.875rem (14px)

### Body Text
- `.md3-body-large`: 1rem (16px)
- `.md3-body-medium`: 0.875rem (14px)
- `.md3-body-small`: 0.75rem (12px)

### Labels
- `.md3-label-large`: 0.875rem (14px)
- `.md3-label-medium`: 0.75rem (12px)
- `.md3-label-small`: 0.6875rem (11px)

## 🧩 Components

### Cards
```tsx
<div className="md3-card md3-elevation-2">
  <h3 className="md3-title-medium">Card Title</h3>
  <p className="md3-body-medium">Card content</p>
</div>
```

### Buttons
```tsx
<!-- Filled Button -->
<button className="md3-button md3-button-filled">
  Primary Action
</button>

<!-- Outlined Button -->
<button className="md3-button md3-button-outlined">
  Secondary Action
</button>

<!-- Text Button -->
<button className="md3-button md3-button-text">
  Text Action
</button>
```

### Text Fields
```tsx
<input
  className="md3-textfield md3-body-medium"
  placeholder="Enter text..."
/>
```

### Surface Variants
```tsx
<!-- Main surface -->
<div className="md3-surface">
  Main content area
</div>

<!-- Surface variant -->
<div className="md3-surface-variant">
  Secondary content
</div>
```

## 📐 Elevation System

### Available Elevations
- `.md3-elevation-0`: No shadow
- `.md3-elevation-1`: Low elevation
- `.md3-elevation-2`: Medium elevation
- `.md3-elevation-3`: High elevation
- `.md3-elevation-4`: Higher elevation
- `.md3-elevation-5`: Maximum elevation

## 🎯 Interactive States

### Hover Effects
```css
.md3-button:hover {
  background-color: rgb(var(--md-primary) / 0.8);
  box-shadow: var(--md-shadow-1);
}
```

### Focus States
```css
.md3-textfield:focus {
  border-bottom-color: rgb(var(--md-primary));
  border-bottom-width: 2px;
}
```

## 📱 Responsive Design

All components are built with responsive design in mind:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards will stack on mobile, show 2 on tablet, 3 on desktop */}
</div>
```

## 🔧 Customization

### Custom Color Scheme
To customize colors, modify the CSS variables in `:root`:

```css
:root {
  --md-primary: 33 150 243; /* Change primary color */
  --md-surface: 255 251 254; /* Change surface color */
}
```

### Dark Mode Support
For dark mode support, you can extend the system:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-surface: 28 27 31;
    --md-on-surface: 255 251 254;
    /* Add other dark mode colors */
  }
}
```

## 📚 Component Library

### Current Components
- ✅ **App**: Main application with MD3 layout
- ✅ **InventoryCard**: Product cards with elevation
- ✅ **InventoryList**: Grid layout with loading states
- ✅ **ErrorMessage**: Error notifications
- ✅ **SearchBar**: Search input with MD3 styling

### Available Components
- ✅ **Cards** (`.md3-card`)
- ✅ **Buttons** (`.md3-button` variants)
- ✅ **Text Fields** (`.md3-textfield`)
- ✅ **Typography** (`.md3-*` classes)
- ✅ **Elevation** (`.md3-elevation-*`)
- ✅ **Surfaces** (`.md3-surface*`)

## 🚀 Performance

- **Lightweight**: Only uses CSS custom properties
- **Fast**: No JavaScript overhead for styling
- **Responsive**: Mobile-first approach
- **Accessible**: Proper color contrast ratios
- **Modern**: Uses CSS Grid and Flexbox

## 📖 Usage Examples

### Product Card
```tsx
const ProductCard = ({ product }) => (
  <div className="md3-card md3-elevation-1">
    <h3 className="md3-title-medium">{product.name}</h3>
    <p className="md3-body-medium">{product.description}</p>
    <div className="flex justify-between items-center mt-4">
      <span className="md3-label-large">${product.price}</span>
      <button className="md3-button md3-button-filled">
        Add to Cart
      </button>
    </div>
  </div>
);
```

### Search Interface
```tsx
const SearchInterface = () => (
  <div className="md3-surface">
    <div className="max-w-md mx-auto">
      <input
        className="md3-textfield md3-title-medium"
        placeholder="Search products..."
      />
    </div>
  </div>
);
```

## 🎨 Design Tokens

All design tokens are centralized in CSS custom properties for easy maintenance and consistency across the application.
