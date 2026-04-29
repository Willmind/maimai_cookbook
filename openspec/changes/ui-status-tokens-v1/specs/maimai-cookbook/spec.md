# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Shared semantic status tokens

The system SHALL define shared semantic status tokens for neutral, selected, success, warning, danger, and info UI states.

#### Scenario: UI renders status states

- GIVEN a component displays a selected, success, warning, danger, info, or neutral state
- WHEN the state is styled
- THEN it uses the shared semantic token set
- AND the visual direction remains consistent with the warm paper kitchen notebook style

