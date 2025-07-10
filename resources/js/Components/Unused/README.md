# 📦 Unused Components

This folder contains components that are not currently being used in the application but may be useful for future features.

## Components:

### 1. **StatCard.svelte**
- **Purpose**: Statistics card for dashboard metrics
- **Use Case**: Displaying KPIs, metrics, and statistics with icons and trends
- **Example**: Total Users, Revenue, Growth Rate cards

### 2. **EmptyState.svelte**
- **Purpose**: Placeholder for empty data states
- **Use Case**: When tables, lists, or sections have no data
- **Features**: Icon, title, description, and optional action button

### 3. **Input.svelte**
- **Purpose**: Basic text input component
- **Note**: Currently using IconInput.svelte instead which has more features
- **Use Case**: Simple text inputs without icons

### 4. **Button.svelte.backup**
- **Purpose**: Backup of the old Button component
- **Note**: Kept for reference before the component consolidation

## How to Use:

To use any of these components, simply move them back to their appropriate folder:
- `StatCard.svelte` → `Components/Dashboard/`
- `EmptyState.svelte` → `Components/UI/`
- `Input.svelte` → `Components/UI/Form/`

Then import and use them in your pages:

```svelte
import StatCard from '@/Components/Dashboard/StatCard.svelte';
import EmptyState from '@/Components/UI/EmptyState.svelte';
import Input from '@/Components/UI/Form/Input.svelte';
```

## Why Keep Them?

These components are well-built and tested, and may be needed for:
- Dashboard enhancements (StatCard)
- Better UX for empty states (EmptyState)
- Simpler form inputs (Input)

They can serve as references or be quickly reintegrated when needed.