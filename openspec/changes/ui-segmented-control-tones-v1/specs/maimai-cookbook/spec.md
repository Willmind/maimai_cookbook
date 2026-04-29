# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Semantic tones for segmented control selected states

The system SHALL allow segmented control options to use semantic tones when selected.

#### Scenario: User selects a cooking result tone

- GIVEN a segmented control option declares a tone
- WHEN the option is selected
- THEN the selected state uses the corresponding semantic tone
- AND unselected options remain visually neutral

