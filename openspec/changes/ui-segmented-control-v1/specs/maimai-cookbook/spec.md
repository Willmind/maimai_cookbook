# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Segmented control for compact single-choice fields

The system SHALL provide a reusable segmented control for compact single-choice form fields.

#### Scenario: User chooses a cooking result

- GIVEN the user opens the cooking log form
- WHEN the user chooses a cooking result
- THEN the result can be selected using a segmented button group
- AND the selected value is saved to the cooking log result field

