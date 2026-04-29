# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Minimal information in all recipes cards

The system SHALL show only thumbnail, title, and description in all recipes list cards.

#### Scenario: User browses all recipes

- GIVEN the user opens the all recipes page
- WHEN recipe cards are rendered
- THEN each card displays only thumbnail, title, and description
- AND does not display familiarity, want-to-make text, or tag chips
