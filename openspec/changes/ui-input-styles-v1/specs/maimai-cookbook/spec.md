# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Consistent form control interaction states

The system SHALL provide consistent visual states for text inputs, textareas, and selects.

#### Scenario: User interacts with form controls

- GIVEN the user focuses, hovers, activates, or encounters a disabled form control
- WHEN the control is an input, textarea, select, or search input
- THEN the control shows a consistent visible state
- AND the state does not cause layout shift

