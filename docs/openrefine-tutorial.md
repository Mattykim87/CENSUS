# OpenRefine Features Tutorial

This tutorial demonstrates the OpenRefine-style data transformation features using the sample data file.

## Sample Data Overview

The included `sample-data.csv` file contains common data quality issues:

1. **Extra whitespace** in names and emails (e.g., "  John Doe  ")
2. **Inconsistent capitalization** in status field (TODO, todo, done, DONE)
3. **Duplicate rows** (John Doe appears 3 times)
4. **Missing values** in status and description fields
5. **Mixed case** in priority field (HIGH, low, MEDIUM)

## Transformation Workflow Examples

### Example 1: Basic Data Cleaning

**Goal**: Clean up the data for consistent formatting

**Steps**:
1. Upload the CSV file
2. Select the "name" column
3. Apply "Trim" transformation to remove extra whitespace
4. Select the "email" column
5. Apply "Trim" transformation
6. Click "Remove Duplicates" to eliminate duplicate rows
7. Preview shows cleaned data with no duplicates

**Result**:
- Whitespace removed from names and emails
- Only 7 unique rows (3 duplicates removed)

### Example 2: Standardize Status Values

**Goal**: Convert all status values to lowercase for consistency

**Steps**:
1. After basic cleaning (Example 1)
2. Select the "status" column
3. View column statistics:
   - Data type: string
   - Unique values: 5 (TODO, todo, done, DONE, etc.)
   - Empty cells: 1
4. Apply "lowercase" transformation
5. Apply "Fill Empty Cells" with value: "todo"

**Result**:
- All status values are lowercase: "todo", "in progress", "done", "canceled"
- No empty cells in status column

### Example 3: Standardize Priority Values

**Goal**: Convert all priority values to UPPERCASE

**Steps**:
1. Select the "priority" column
2. Apply "UPPERCASE" transformation

**Result**:
- All priority values are uppercase: HIGH, MEDIUM, LOW

### Example 4: Split Name Column

**Goal**: Split full names into first and last names

**Steps**:
1. Select the "name" column
2. Click "Add Advanced Transformation"
3. Choose "Split Column"
4. Enter separator: " " (space)
5. Enter new column names: "first_name, last_name"
6. Click "Add Transformation"

**Result**:
- New columns created: "first_name" and "last_name"
- "John Doe" becomes first_name: "John", last_name: "Doe"

### Example 5: Create Email Domain Column

**Goal**: Extract email domain from email addresses

**Steps**:
1. Select the "email" column
2. Click "Add Advanced Transformation"
3. Choose "Split Column"
4. Enter separator: "@"
5. Enter new column names: "email_user, email_domain"

**Result**:
- Email split into user and domain parts
- "john.doe@example.com" becomes:
  - email_user: "john.doe"
  - email_domain: "example.com"

### Example 6: Merge Name Parts

**Goal**: Create a display name from first and last name

**Steps**:
1. (After splitting names in Example 4)
2. Click "Add Advanced Transformation"
3. Choose "Merge Columns"
4. Select columns: "first_name" and "last_name"
5. Enter separator: " "
6. Enter new column name: "display_name"

**Result**:
- New column "display_name" contains "John Doe", "Jane Smith", etc.

### Example 7: Find and Replace

**Goal**: Standardize "in progress" to "in-progress" with hyphen

**Steps**:
1. Select the "status" column
2. Click "Add Advanced Transformation"
3. Choose "Find & Replace"
4. Find text: "in progress"
5. Replace with: "in-progress"
6. Case sensitive: No

**Result**:
- All "in progress" values become "in-progress"

### Example 8: Complete Data Cleaning Pipeline

**Goal**: Apply all transformations in sequence

**Steps**:
1. Select "name" → Apply "Trim"
2. Select "email" → Apply "Trim"
3. Apply "Remove Duplicates" (global)
4. Select "status" → Apply "lowercase"
5. Select "status" → Apply "Fill Empty Cells" with "todo"
6. Select "priority" → Apply "UPPERCASE"
7. Select "description" → Apply "Fill Empty Cells" with "No description"

**Transformation Pipeline**:
```
1. Trim - Column: name
2. Trim - Column: email
3. Remove Duplicates
4. Convert to Lowercase - Column: status
5. Fill Empty Cells - Column: status (value: "todo")
6. Convert to UPPERCASE - Column: priority
7. Fill Empty Cells - Column: description (value: "No description")
```

**Result**:
- Clean, consistent data ready for import
- No duplicates
- No empty cells
- Standardized formatting

## Before and After Comparison

### Before Transformations:
```csv
name,email,status,priority,estimated_hours,description
  John Doe  ,john.doe@example.com,TODO,HIGH,5,Fix login issue
Jane Smith,jane.smith@example.com,in progress,medium,3,Update documentation
Bob Johnson  ,bob.johnson@example.com,DONE,low,2,Add unit tests
Alice Brown,alice.brown@example.com,todo,high,8,Implement new feature
  John Doe  ,john.doe@example.com,TODO,HIGH,5,Fix login issue
Charlie Wilson,charlie@example.com,,medium,4,Review pull requests
Diana Prince,diana.prince@example.com,In Progress,LOW,6,Refactor code
  John Doe  ,john.doe@example.com,TODO,HIGH,5,Fix login issue
Eve Davis,eve.davis@example.com,done,MEDIUM,3,
Frank Miller,  frank.miller@example.com  ,canceled,high,10,Migrate database
```

### After Complete Data Cleaning Pipeline:
```csv
name,email,status,priority,estimated_hours,description
John Doe,john.doe@example.com,todo,HIGH,5,Fix login issue
Jane Smith,jane.smith@example.com,in-progress,MEDIUM,3,Update documentation
Bob Johnson,bob.johnson@example.com,done,LOW,2,Add unit tests
Alice Brown,alice.brown@example.com,todo,HIGH,8,Implement new feature
Charlie Wilson,charlie@example.com,todo,MEDIUM,4,Review pull requests
Diana Prince,diana.prince@example.com,in-progress,LOW,6,Refactor code
Eve Davis,eve.davis@example.com,done,MEDIUM,3,No description
Frank Miller,frank.miller@example.com,canceled,HIGH,10,Migrate database
```

**Improvements**:
- ✅ Whitespace removed
- ✅ Duplicates eliminated (10 rows → 8 rows)
- ✅ Status values standardized (lowercase, with hyphen)
- ✅ Priority values standardized (UPPERCASE)
- ✅ No empty cells
- ✅ Data ready for import

## Tips and Best Practices

1. **Start with Trim**: Always trim whitespace first to clean up data
2. **Remove Duplicates Early**: Do this before other transformations to reduce processing
3. **Standardize Case**: Choose either UPPERCASE or lowercase for categorical data
4. **Fill Empty Cells**: Provide meaningful defaults for missing data
5. **Preview Before Confirming**: Always check the preview table before uploading
6. **Use Pipeline Order**: Apply transformations in logical order
7. **Test with Small Files**: Try transformations on small samples first

## Common Use Cases

### Use Case 1: Customer Data Import
- Trim all text fields
- Standardize phone numbers format
- Fill missing emails with "noemail@example.com"
- Standardize country names (USA, US, United States → USA)

### Use Case 2: Product Catalog Cleanup
- Remove duplicate product SKUs
- Standardize product categories (Title Case)
- Fill missing descriptions
- Split combined fields (e.g., "Size: Large, Color: Red")

### Use Case 3: Survey Results Processing
- Standardize yes/no responses (YES, yes, Y → yes)
- Fill missing responses with "No response"
- Merge first/last name columns
- Clean up email addresses

### Use Case 4: Sales Data Preparation
- Trim customer names
- Standardize date formats
- Fill missing values with 0
- Uppercase region codes
- Remove test/duplicate entries

## Keyboard Shortcuts

- **Tab**: Navigate between fields in transformation dialog
- **Enter**: Confirm transformation dialog
- **Escape**: Close dialog without adding transformation

## Troubleshooting

### Issue: Transformation not applied
**Solution**: Check that a column is selected before applying column-specific transformations

### Issue: Preview not updating
**Solution**: Make sure you've added the transformation to the pipeline

### Issue: Wrong data after transformation
**Solution**: Remove the transformation and try again. Transformations are non-destructive until you confirm

### Issue: Too many transformations
**Solution**: Use "Clear All" to start fresh, then rebuild your pipeline

## Next Steps

After transforming your data:
1. Click "Confirm & Continue"
2. Fill in the title and description for your CSV import
3. Click "Upload CSV"
4. Your cleaned, transformed data will be imported into the system

The transformation pipeline is saved with your upload for reference and audit purposes.
