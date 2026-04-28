# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Mock-first frontend implementation

The system SHALL implement the first MVP using local mock data while preserving a data boundary that can later be replaced by Supabase.

#### Scenario: Views use repository interfaces

- GIVEN a page needs recipe or cooking log data
- WHEN the page loads data
- THEN it uses repository functions instead of importing mock arrays directly

#### Scenario: Mock data matches future backend shape

- GIVEN mock recipes and cooking logs exist
- WHEN the data is consumed by the UI
- THEN the fields match the future Supabase table shape from `docs/product-mvp.md`

### Requirement: Supabase replacement path

The system SHALL allow Supabase repositories to replace mock repositories without rewriting page components.

#### Scenario: Switch data source later

- GIVEN the mock MVP is implemented
- WHEN Supabase tables and storage are ready
- THEN only repository implementations and app configuration need to change
- AND domain types and view logic remain stable

