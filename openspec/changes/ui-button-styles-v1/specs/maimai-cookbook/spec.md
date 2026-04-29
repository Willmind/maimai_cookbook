# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Consistent button interaction states

The system SHALL provide consistent visual interaction states for primary, secondary, ghost, and small action buttons without introducing a UI library.

#### Scenario: User interacts with app buttons

- GIVEN a button uses `.primary-action`, `.secondary-action`, `.ghost-action`, or `.small-action`
- WHEN the user hovers, presses, focuses with keyboard, or encounters a disabled button
- THEN the button shows a consistent visual state
- AND the interaction remains aligned with the warm paper kitchen notebook visual direction

