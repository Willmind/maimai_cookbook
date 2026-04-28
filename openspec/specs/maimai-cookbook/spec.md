# maimai-cookbook Specification

## Purpose

Define the MVP behavior for 麦麦手记, a personal recipe notebook and cooking log app.

## Requirements

### Requirement: Recipe creation

The system SHALL allow the user to create a recipe with only a name.

#### Scenario: Create recipe with minimal data

- GIVEN the user opens the new recipe page
- WHEN the user enters a recipe name
- AND submits the form
- THEN the system creates the recipe
- AND sets `want_to_make` to true by default
- AND sets `familiarity` to `new` by default

#### Scenario: Create recipe with optional details

- GIVEN the user opens the new recipe page
- WHEN the user enters source, description, cover image, ingredients, method, next note, familiarity, want-to-make status, or tags
- AND submits the form
- THEN the system saves those optional fields with the recipe

### Requirement: Recipe and cooking log relationship

The system SHALL store recipes and cooking logs as separate records linked by `recipe_id`.

#### Scenario: Create cooking log from recipe detail

- GIVEN a recipe exists
- WHEN the user opens the recipe detail page
- AND chooses `记一次`
- THEN the system opens a cooking log form for that recipe
- AND displays the recipe name as read-only

#### Scenario: Prevent detached cooking logs

- GIVEN no recipe is selected
- WHEN the user wants to create a cooking log
- THEN the system does not provide a global cooking log creation entry

### Requirement: Home page

The system SHALL make the home page a lightweight entry point for search, recent cooking, and want-to-make recipes.

#### Scenario: View recent cooking logs

- GIVEN cooking logs exist
- WHEN the user opens the home page
- THEN the system shows recent cooking logs
- AND the list represents `cooking_logs`, not recipe records

#### Scenario: View want-to-make recipes

- GIVEN recipes exist with `want_to_make = true`
- WHEN the user opens the home page
- THEN the system shows want-to-make recipes
- AND the list represents `recipes`, not cooking log records

### Requirement: All recipes page

The system SHALL provide a separate all recipes page.

#### Scenario: Filter recipes

- GIVEN recipes exist
- WHEN the user opens the all recipes page
- THEN the system offers filters for `全部`, `想做`, `没做过`, `做过`, and `常做`
- AND does not show a bulky tag filter panel in MVP

### Requirement: Search

The system SHALL search recipes first and cooking logs second.

#### Scenario: Search by keyword

- GIVEN recipes and cooking logs exist
- WHEN the user searches a keyword
- THEN the system shows recipe results before cooking log results
- AND prioritizes recipe name matches before ingredient, tag, or method matches
- AND prioritizes recent cooking logs in the cooking log result group

### Requirement: Image uploads

The system SHALL support at most one image for each recipe cover and each cooking log photo in MVP.

#### Scenario: Manage one uploaded image

- GIVEN an image has been uploaded
- WHEN the upload succeeds
- THEN the system shows a thumbnail
- AND offers actions to replace or delete the image

#### Scenario: Upload fails

- GIVEN an image upload is in progress
- WHEN the upload fails
- THEN the system shows a failure state
- AND offers actions to retry or remove the failed upload

