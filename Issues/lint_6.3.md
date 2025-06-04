Run pnpm lint
  pnpm lint
  shell: /usr/bin/bash -e {0}
  env:
    FORCE_COLOR: 3
    NEXT_PUBLIC_SUPABASE_URL: 
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 
    SUPABASE_SERVICE_ROLE_KEY: 
    PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin

> shadcn-table@0.1.0 lint /home/runner/work/CENSUS/CENSUS
> biome check .

./src/app/_components/csv-preview-sheet.tsx:160:33 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    158 │                   <FormLabel>CSV File</FormLabel>
    159 │                   <div
  > 160 │                     className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-colors ${
        │                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    161 │                       isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
    162 │                     }`}
  
  i Unsafe fix: Sort the classes.
  
    158 158 │                     <FormLabel>CSV File</FormLabel>
    159 159 │                     <div
    160     │ - ····················className={`border-2·border-dashed·rounded-md·p-6·flex·flex-col·items-center·justify-center·transition-colors·${
        160 │ + ····················className={`flex·flex-col·items-center·justify-center·rounded-md·border-2·border-dashed·p-6·transition-colors·${
    161 161 │                         isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
    162 162 │                       }`}
  

./src/app/_components/csv-preview-sheet.tsx:170:35 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    168 │                       <svg
    169 │                         xmlns="http://www.w3.org/2000/svg"
  > 170 │                         className="h-10 w-10 text-muted-foreground mb-2"
        │                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    171 │                         fill="none"
    172 │                         viewBox="0 0 24 24"
  
  i Unsafe fix: Sort the classes.
  
    168 168 │                         <svg
    169 169 │                           xmlns="http://www.w3.org/2000/svg"
    170     │ - ························className="h-10·w-10·text-muted-foreground·mb-2"
        170 │ + ························className="mb-2·h-10·w-10·text-muted-foreground"
    171 171 │                           fill="none"
    172 172 │                           viewBox="0 0 24 24"
  

./src/app/_components/csv-preview-sheet.tsx:184:41 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    182 │                       <p className="mb-1 font-medium">
    183 │                         Drag and drop your CSV file here, or{" "}
  > 184 │                         <span className="text-primary cursor-pointer">browse</span>
        │                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    185 │                       </p>
    186 │                       <p className="text-xs text-muted-foreground">
  
  i Unsafe fix: Sort the classes.
  
    182 182 │                         <p className="mb-1 font-medium">
    183 183 │                           Drag and drop your CSV file here, or{" "}
    184     │ - ························<span·className="text-primary·cursor-pointer">browse</span>
        184 │ + ························<span·className="cursor-pointer·text-primary">browse</span>
    185 185 │                         </p>
    186 186 │                         <p className="text-xs text-muted-foreground">
  

./src/app/_components/csv-preview-sheet.tsx:186:36 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    184 │                         <span className="text-primary cursor-pointer">browse</span>
    185 │                       </p>
  > 186 │                       <p className="text-xs text-muted-foreground">
        │                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    187 │                         Supports CSV files up to 10MB
    188 │                       </p>
  
  i Unsafe fix: Sort the classes.
  
    184 184 │                           <span className="text-primary cursor-pointer">browse</span>
    185 185 │                         </p>
    186     │ - ······················<p·className="text-xs·text-muted-foreground">
        186 │ + ······················<p·className="text-muted-foreground·text-xs">
    187 187 │                           Supports CSV files up to 10MB
    188 188 │                         </p>
  

./src/app/_components/csv-upload-sheet.tsx:198:32 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    197 │               {(uploadStatus === "uploading" || uploadStatus === "processing") && (
  > 198 │                 <div className="space-y-2 my-4">
        │                                ^^^^^^^^^^^^^^^^
    199 │                   <Progress value={uploadProgress} className="w-full" />
    200 │                   <p className="text-sm text-muted-foreground">
  
  i Unsafe fix: Sort the classes.
  
    196 196 │   
    197 197 │                 {(uploadStatus === "uploading" || uploadStatus === "processing") && (
    198     │ - ················<div·className="space-y-2·my-4">
        198 │ + ················<div·className="my-4·space-y-2">
    199 199 │                     <Progress value={uploadProgress} className="w-full" />
    200 200 │                     <p className="text-sm text-muted-foreground">
  

./src/app/_components/csv-upload-sheet.tsx:200:32 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    198 │                 <div className="space-y-2 my-4">
    199 │                   <Progress value={uploadProgress} className="w-full" />
  > 200 │                   <p className="text-sm text-muted-foreground">
        │                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    201 │                     {uploadStatus === "uploading" ? "Uploading file..." : "Processing CSV data..."}
    202 │                     {uploadProgress > 0 && ` (${Math.round(uploadProgress)}%)`}
  
  i Unsafe fix: Sort the classes.
  
    198 198 │                   <div className="space-y-2 my-4">
    199 199 │                     <Progress value={uploadProgress} className="w-full" />
    200     │ - ··················<p·className="text-sm·text-muted-foreground">
        200 │ + ··················<p·className="text-muted-foreground·text-sm">
    201 201 │                       {uploadStatus === "uploading" ? "Uploading file..." : "Processing CSV data..."}
    202 202 │                       {uploadProgress > 0 && ` (${Math.round(uploadProgress)}%)`}
  

./src/app/_components/csv-upload-sheet.tsx organizeImports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Import statements could be sorted:
  
      1   1 │   "use client";
      2   2 │   
      3     │ - import·{·zodResolver·}·from·"@hookform/resolvers/zod";
          3 │ + import·{·Progress·}·from·"@/components/ui/progress";
          4 │ + import·{·zodResolver·}·from·"@hookform/resolvers/zod";
      4   5 │   import { useState, useTransition } from "react";
      5   6 │   import { useForm } from "react-hook-form";
      6     │ - import·{·toast·}·from·"sonner";
      7     │ - import·{·Progress·}·from·"@/components/ui/progress";
          7 │ + import·{·toast·}·from·"sonner";
      8   8 │   
      9   9 │   import { Button } from "@/components/ui/button";
  

./src/app/_components/csv-preview-sheet.tsx format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
     58  58 │     const processFile = (file: File | undefined) => {
     59  59 │       if (!file) return;
     60     │ - ····
         60 │ + 
     61  61 │       form.setValue("file", file);
     62  62 │   
    ······· │ 
     94  94 │       }
     95  95 │     };
     96     │ - ··
         96 │ + 
     97  97 │     const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
     98  98 │       e.preventDefault();
    ······· │ 
    100 100 │       setIsDragging(true);
    101 101 │     };
    102     │ - ··
        102 │ + 
    103 103 │     const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    104 104 │       e.preventDefault();
    ······· │ 
    106 106 │       setIsDragging(false);
    107 107 │     };
    108     │ - ··
        108 │ + 
    109 109 │     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    110 110 │       e.preventDefault();
    111 111 │       e.stopPropagation();
    112 112 │       setIsDragging(false);
    113     │ - ····
        113 │ + 
    114 114 │       const files = e.dataTransfer.files;
    115 115 │       if (files.length > 0) {
    ······· │ 
    126 126 │     const handleConfirm = () => {
    127 127 │       const formFile = form.getValues("file");
    128     │ - ····
        128 │ + 
    129 129 │       // Explicit type guard to make TypeScript happy
    130 130 │       if (!formFile || !previewData) {
    131 131 │         return;
    132 132 │       }
    133     │ - ····
        133 │ + 
    134 134 │       // At this point TypeScript knows formFile is defined and is a File
    135 135 │       onConfirm(formFile, previewData.headers, previewData.totalRows);
    ······· │ 
    159 159 │                     <div
    160 160 │                       className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-colors ${
    161     │ - ······················isDragging·?·"border-primary·bg-primary/5"·:·"border-muted-foreground/25"
        161 │ + ······················isDragging
        162 │ + ························?·"border-primary·bg-primary/5"
        163 │ + ························:·"border-muted-foreground/25"
    162 164 │                       }`}
    163 165 │                       onDragOver={handleDragOver}
    ······· │ 
    182 184 │                         <p className="mb-1 font-medium">
    183 185 │                           Drag and drop your CSV file here, or{" "}
    184     │ - ························<span·className="text-primary·cursor-pointer">browse</span>
        186 │ + ························<span·className="text-primary·cursor-pointer">
        187 │ + ··························browse
        188 │ + ························</span>
    185 189 │                         </p>
    186 190 │                         <p className="text-xs text-muted-foreground">
    ······· │ 
    204 208 │                         variant="outline"
    205 209 │                         className="mt-4"
    206     │ - ······················onClick={()·=>·document.getElementById("csv-file-input")?.click()}
        210 │ + ······················onClick={()·=>
        211 │ + ························document.getElementById("csv-file-input")?.click()
        212 │ + ······················}
    207 213 │                         disabled={isPending}
    208 214 │                       >
  

./src/app/_components/csv-upload-sheet.tsx format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
     97  97 │               setUploadStatus("success");
     98  98 │               toast.success("CSV file uploaded successfully");
     99     │ - ············
         99 │ + 
    100 100 │               // Reset form after a brief delay to show 100% completion
    101 101 │               setTimeout(() => {
    ······· │ 
    195 195 │                 />
    196 196 │   
    197     │ - ··············{(uploadStatus·===·"uploading"·||·uploadStatus·===·"processing")·&&·(
        197 │ + ··············{(uploadStatus·===·"uploading"·||
        198 │ + ················uploadStatus·===·"processing")·&&·(
    198 199 │                   <div className="space-y-2 my-4">
    199 200 │                     <Progress value={uploadProgress} className="w-full" />
    200 201 │                     <p className="text-sm text-muted-foreground">
    201     │ - ····················{uploadStatus·===·"uploading"·?·"Uploading·file..."·:·"Processing·CSV·data..."}
        202 │ + ····················{uploadStatus·===·"uploading"
        203 │ + ······················?·"Uploading·file..."
        204 │ + ······················:·"Processing·CSV·data..."}
    202 205 │                       {uploadProgress > 0 && ` (${Math.round(uploadProgress)}%)`}
    203 206 │                     </p>
    ······· │ 
    216 219 │                       setUploadStatus("idle");
    217 220 │                     }}
    218     │ - ··················disabled={isPending·||·uploadStatus·===·"uploading"·||·uploadStatus·===·"processing"}
        221 │ + ··················disabled={
        222 │ + ····················isPending·||
        223 │ + ····················uploadStatus·===·"uploading"·||
        224 │ + ····················uploadStatus·===·"processing"
        225 │ + ··················}
    219 226 │                   >
    220 227 │                     Cancel
    221 228 │                   </Button>
    222     │ - ················<Button·
    223     │ - ··················type="submit"·
    224     │ - ··················disabled={isPending·||·!selectedFile·||·uploadStatus·===·"uploading"·||·uploadStatus·===·"processing"}
        229 │ + ················<Button
        230 │ + ··················type="submit"
        231 │ + ··················disabled={
        232 │ + ····················isPending·||
        233 │ + ····················!selectedFile·||
        234 │ + ····················uploadStatus·===·"uploading"·||
        235 │ + ····················uploadStatus·===·"processing"
        236 │ + ··················}
    225 237 │                     className="min-w-[100px]"
    226 238 │                   >
    227     │ - ··················{uploadStatus·===·"uploading"·?·"Uploading..."·:·
    228     │ - ···················uploadStatus·===·"processing"·?·"Processing..."·:·"Upload·CSV"}
        239 │ + ··················{uploadStatus·===·"uploading"
        240 │ + ····················?·"Uploading..."
        241 │ + ····················:·uploadStatus·===·"processing"
        242 │ + ······················?·"Processing..."
        243 │ + ······················:·"Upload·CSV"}
    229 244 │                   </Button>
    230 245 │                 </div>
  

./src/lib/url-utils.ts format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
     5  5 │   /**
     6  6 │    * Creates a URL safely with fallbacks to prevent Invalid URL errors during build
     7    │ - ·*·
        7 │ + ·*
     8  8 │    * @param path The path or full URL
     9  9 │    * @param base Optional base URL to use if path is relative
    ····· │ 
    13 13 │     try {
    14 14 │       // If path is already a valid absolute URL, use it directly
    15    │ - ····if·(path.startsWith('http://')·||·path.startsWith('https://'))·{
       15 │ + ····if·(path.startsWith("http://")·||·path.startsWith("https://"))·{
    16 16 │         return new URL(path);
    17 17 │       }
    ····· │ 
    20 20 │       if (base) {
    21 21 │         // Ensure base is a valid URL with http/https
    22    │ - ······const·safeBase·=·base.startsWith('http')·
    23    │ - ········?·base·
    24    │ - ········:·`https://${base}`;
    25    │ - ······
       22 │ + ······const·safeBase·=·base.startsWith("http")·?·base·:·`https://${base}`;
       23 │ + 
    26 24 │         return new URL(path, safeBase);
    27 25 │       }
    28 26 │   
    29 27 │       // For relative URLs without a base, use a default base
    30    │ - ····const·defaultBase·=·process.env.NEXT_PUBLIC_SITE_URL·||·'https://tablecn.com';
       28 │ + ····const·defaultBase·=
       29 │ + ······process.env.NEXT_PUBLIC_SITE_URL·||·"https://tablecn.com";
    31 30 │       return new URL(path, defaultBase);
    32 31 │     } catch (e) {
    ····· │ 
    38 37 │   /**
    39 38 │    * Gets a URL string safely, with fallback value if creation fails
    40    │ - ·*·
       39 │ + ·*
    41 40 │    * @param path The path or full URL
    42 41 │    * @param base Optional base URL to use if path is relative
    ····· │ 
    45 44 │    */
    46 45 │   export function getSafeUrlString(
    47    │ - ··path:·string,·
    48    │ - ··base?:·string,·
    49    │ - ··fallback·=·'https://tablecn.com'
       46 │ + ··path:·string,
       47 │ + ··base?:·string,
       48 │ + ··fallback·=·"https://tablecn.com",
    50 49 │   ): string {
    51 50 │     const url = createSafeUrl(path, base);
  

./src/app/_components/tasks-table.tsx organizeImports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Import statements could be sorted:
  
     13  13 │   import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
     14  14 │   import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
     15     │ - import·{·TasksTableToolbarActions·}·from·"./tasks-table-toolbar-actions";
     16     │ - import·type·{
         15 │ + import·type·{
     17  16 │     getEstimatedHoursRange,
     18  17 │     getTaskPriorityCounts,
    ······· │ 
     24  23 │   import { TasksTableActionBar } from "./tasks-table-action-bar";
     25  24 │   import { getTasksTableColumns } from "./tasks-table-columns";
     26     │ - import·{·UpdateTaskSheet·}·from·"./update-task-sheet";
         25 │ + import·{·TasksTableToolbarActions·}·from·"./tasks-table-toolbar-actions";
         26 │ + import·{·UpdateTaskSheet·}·from·"./update-task-sheet";
     27  27 │   
     28  28 │   interface TasksTableProps {
  

./src/app/_lib/validations.ts:78:7 lint/style/noUnusedTemplateLiteral  FIXABLE  ━━━━━━━━━━━━━━━━━━━━

  × Do not use template literals if interpolation and special-character handling are not needed.
  
    76 │     .refine(
    77 │       (file) => file.size <= MAX_FILE_SIZE,
  > 78 │       `File size must be less than 10MB`,
       │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    79 │     ),
    80 │   title: z.string().min(1, "Title is required"),
  
  i Unsafe fix: Replace with string literal
  
     76  76 │       .refine(
     77  77 │         (file) => file.size <= MAX_FILE_SIZE,
     78     │ - ······`File·size·must·be·less·than·10MB`,
         78 │ + ······"File·size·must·be·less·than·10MB",
     79  79 │       ),
     80  80 │     title: z.string().min(1, "Title is required"),
  

./src/app/_lib/validations.ts:97:7 lint/style/noUnusedTemplateLiteral  FIXABLE  ━━━━━━━━━━━━━━━━━━━━

  × Do not use template literals if interpolation and special-character handling are not needed.
  
    95 │     .refine(
    96 │       (file) => file.size <= MAX_FILE_SIZE,
  > 97 │       `File size must be less than 10MB`,
       │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    98 │     ),
    99 │ });
  
  i Unsafe fix: Replace with string literal
  
     95  95 │       .refine(
     96  96 │         (file) => file.size <= MAX_FILE_SIZE,
     97     │ - ······`File·size·must·be·less·than·10MB`,
         97 │ + ······"File·size·must·be·less·than·10MB",
     98  98 │       ),
     99  99 │   });
  

./src/env.js format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
    37 37 │      * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
    38 38 │      * useful for Docker builds or Vercel deployments where environment variables might be set differently.
    39    │ - ···*·
       39 │ + ···*
    40 40 │      * During build on CI/CD platforms, we might want to automatically skip validation
    41 41 │      * to prevent issues with /_not-found prerendering.
    42 42 │      */
    43    │ - ··skipValidation:·!!process.env.SKIP_ENV_VALIDATION·||·process.env.NODE_ENV·===·"production",
       43 │ + ··skipValidation:
       44 │ + ····!!process.env.SKIP_ENV_VALIDATION·||·process.env.NODE_ENV·===·"production",
    44 45 │     /**
    45 46 │      * Makes it so that empty strings are treated as undefined.
  

./src/config/site.ts format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
     8  8 │     description:
     9  9 │       "Shadcn table with server side sorting, pagination, and filtering",
    10    │ - ··url:·getSafeUrlString(process.env.NEXT_PUBLIC_SITE_URL·||·"https://tablecn.com"),
       10 │ + ··url:·getSafeUrlString(
       11 │ + ····process.env.NEXT_PUBLIC_SITE_URL·||·"https://tablecn.com",
       12 │ + ··),
    11 13 │     links: { github: "https://github.com/sadmann7/shadcn-table" },
    12 14 │   };
  

./src/components/ui/progress.tsx:20:7 lint/a11y/useFocusableInteractive ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × The HTML element with the interactive role "progressbar" is not focusable.
  
    18 │       {...props}
    19 │     >
  > 20 │       <div
       │       ^^^^
  > 21 │         className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
        ...
  > 26 │         role="progressbar"
  > 27 │       />
       │       ^^
    28 │     </div>
    29 │   )
  
  i A non-interactive HTML element that is not focusable may not be reachable for users that rely on keyboard navigation, even with an added role like "progressbar".
  
  i Add a tabIndex attribute to make this element focusable.
  

./src/components/ui/progress.tsx organizeImports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Import statements could be sorted:
  
     1  1 │   "use client"
     2  2 │   
     3    │ - import·*·as·React·from·"react"
     4    │ - import·{·cn·}·from·"@/lib/utils"
        3 │ + import·{·cn·}·from·"@/lib/utils"
        4 │ + import·*·as·React·from·"react"
     5  5 │   
     6  6 │   interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  

./src/components/ui/progress.tsx format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
     1    │ - "use·client"
        1 │ + "use·client";
     2  2 │   
     3    │ - import·*·as·React·from·"react"
     4    │ - import·{·cn·}·from·"@/lib/utils"
        3 │ + import·*·as·React·from·"react";
        4 │ + import·{·cn·}·from·"@/lib/utils";
     5  5 │   
     6  6 │   interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
     7    │ - ··value?:·number
        7 │ + ··value?:·number;
     8  8 │   }
     9  9 │   
    ····· │ 
    14 14 │         className={cn(
    15 15 │           "relative h-2 w-full overflow-hidden rounded-full bg-muted",
    16    │ - ········className
       16 │ + ········className,
    17 17 │         )}
    18 18 │         {...props}
    ····· │ 
    27 27 │         />
    28 28 │       </div>
    29    │ - ··)
    30    │ - )
    31    │ - Progress.displayName·=·"Progress"
       29 │ + ··),
       30 │ + );
       31 │ + Progress.displayName·=·"Progress";
    32 32 │   
    33    │ - export·{·Progress·}
       33 │ + export·{·Progress·};
    34 34 │   
  

check ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  

Skipped 3 suggested fixes.
If you wish to apply the suggested (unsafe) fixes, use the command biome check --fix --unsafe

Checked 120 files in 129ms. No fixes applied.
Found 12 errors.
Found 6 warnings.
 ELIFECYCLE  Command failed with exit code 1.
Error: Process completed with exit code 1.