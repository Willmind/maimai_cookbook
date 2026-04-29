# maimai-cookbook Spec Delta

## ADDED Requirements

### Requirement: Minimal polaroid-style single image upload control

The system SHALL present recipe cover and cooking log image UI as a minimal single-frame polaroid-style control.

#### Scenario: User manages one optional image

- GIVEN an image field supports at most one image
- WHEN the field is empty, uploading, uploaded, or failed
- THEN the control shows the corresponding single-frame state
- AND offers only the relevant local actions for that state
- AND does not perform real file upload or Supabase Storage integration in the mock MVP

