# OpenRefine-Style Data Transformation Features

This document describes the modern OpenRefine-style data transformation features added to the CENSUS application.

## Overview

OpenRefine is a powerful open-source tool for working with messy data. We've implemented similar functionality that allows users to clean, transform, and manipulate CSV data before importing it into the system.

## Features

### 1. Data Analysis & Statistics

When you preview a CSV file, the system automatically analyzes each column and provides:

- **Unique value count**: Number of distinct values in the column
- **Empty cell count**: Number of cells with no data
- **Data type detection**: Automatically detects if the column contains:
  - Numbers
  - Dates
  - Strings
  - Mixed data types
- **Sample values**: Shows up to 5 sample values from the column

### 2. Quick Transformations

Apply common transformations with a single click:

- **Trim**: Remove leading and trailing whitespace
- **UPPERCASE**: Convert all text to uppercase
- **lowercase**: Convert all text to lowercase
- **Title Case**: Capitalize the first letter of each word
- **Remove Duplicates**: Remove duplicate rows from the entire dataset

### 3. Advanced Transformations

More complex transformations that require configuration:

#### Find & Replace
- Find and replace text within a column
- Case-sensitive or case-insensitive matching
- Global replacement (all occurrences)

#### Fill Empty Cells
- Fill all empty cells in a column with a specified value
- Useful for providing default values

#### Split Column
- Split a column into multiple columns based on a delimiter
- Specify new column names for the split data
- Example: Split "Full Name" into "First Name" and "Last Name"

#### Merge Columns
- Combine multiple columns into a single column
- Choose which columns to merge
- Specify a separator (space, comma, etc.)
- Define the name for the new merged column

### 4. Transformation Pipeline

- Apply multiple transformations in sequence
- Preview the results before confirming
- See how many transformations are applied
- Clear all transformations to start over
- Remove individual transformations from the pipeline

## How to Use

### Step 1: Upload CSV File

1. Click on the "Upload CSV" button
2. In the dialog, click "Select CSV File"
3. Choose your CSV file or drag and drop it

### Step 2: Preview & Transform

1. The system will display a preview of your data (first 10 rows)
2. On the left, you'll see the **Data Transformations** panel

### Step 3: Select a Column

1. Use the dropdown to select the column you want to transform
2. View statistics about the selected column:
   - Unique values
   - Empty cells
   - Data type
   - Sample values

### Step 4: Apply Transformations

#### Quick Transformations
1. Click any of the quick transformation buttons (Trim, UPPERCASE, etc.)
2. The transformation is immediately added to your pipeline
3. The preview updates to show the transformed data

#### Advanced Transformations
1. Click "Add Advanced Transformation"
2. Choose the transformation type
3. Configure the options (e.g., find/replace text, separator, etc.)
4. Click "Add Transformation"

### Step 5: Review Applied Transformations

- See all applied transformations in the "Applied Transformations" section
- Each transformation shows:
  - Order number
  - Transformation type
  - Target column
- Remove individual transformations by clicking the trash icon
- Clear all transformations with "Clear All"

### Step 6: Confirm & Upload

1. Review the preview table to ensure your transformations are correct
2. The status line shows how many transformations were applied
3. Click "Confirm & Continue" to proceed with the upload
4. Fill in title and description for your CSV import
5. Click "Upload CSV" to complete the import

## Transformation Examples

### Example 1: Clean Name Data
- Select the "name" column
- Apply "Trim" to remove extra spaces
- Apply "Title Case" to standardize capitalization

### Example 2: Extract Address Components
- Select the "address" column containing "123 Main St, New York, NY"
- Apply "Split Column" with separator ", "
- Provide new column names: "Street, City, State"

### Example 3: Create Full Name
- Select "first_name" and "last_name" columns
- Apply "Merge Columns"
- Use space as separator
- Name the new column "full_name"

### Example 4: Standardize Case
- Select any text column
- Apply "lowercase" to standardize all text
- Or apply "UPPERCASE" for all caps

### Example 5: Data Cleanup
- Apply "Trim" to all columns to remove whitespace
- Apply "Remove Duplicates" to eliminate duplicate rows
- Use "Fill Empty Cells" to replace missing values with "N/A"

## Technical Details

### Data Type Detection

The system uses intelligent heuristics to detect data types:

- **Number**: All non-empty values can be parsed as numbers
- **Date**: All non-empty values can be parsed as dates
- **Mixed**: Some values are numbers/dates, others are not
- **String**: Default type for text data

### Transformation Order

Transformations are applied in the order they are added:
1. First transformation is applied to original data
2. Second transformation is applied to the result of the first
3. And so on...

This allows you to build complex transformation pipelines.

### Performance

- Preview shows first 10 rows for quick feedback
- Full dataset is transformed when you confirm
- Supports files up to 10MB
- First 50 rows are imported as tasks

## Future Enhancements

Potential future features could include:

- **Clustering**: Find and merge similar values (e.g., "New York" and "NY")
- **Faceting**: Group and filter data by column values
- **Column operations**: Rename, reorder, delete columns
- **Numeric operations**: Mathematical transformations on numeric columns
- **Date operations**: Parse and format dates
- **Regular expressions**: Advanced find/replace with regex
- **Custom transformations**: User-defined transformation scripts
- **Transformation history**: Undo/redo support
- **Save transformation recipes**: Reuse transformation pipelines

## Comparison to OpenRefine

This implementation provides a modern, web-based alternative to OpenRefine with:

- **Integrated workflow**: Transform data as part of the CSV upload process
- **Real-time preview**: See changes immediately
- **Modern UI**: Clean, intuitive interface using shadcn/ui components
- **Server-side processing**: Secure and scalable
- **Database integration**: Automatically import transformed data

While OpenRefine offers more advanced features like faceting and clustering, our implementation focuses on the most common data cleaning tasks in a streamlined, user-friendly interface.
