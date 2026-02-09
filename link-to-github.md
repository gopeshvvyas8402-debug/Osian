# How to Link Your Project with GitHub

## Step 1: Install Git
First, you need to install Git on your system. You can download it from:
https://git-scm.com/downloads

## Step 2: Initialize Git Repository
1. Open Command Prompt or PowerShell in your project directory (osian-enterprise-website-build)
2. Run the following commands:

```bash
# Initialize git repository
git init

# Configure git user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files to git
git add .

# Commit the changes
git commit -m "Initial commit with theme fixes and gradient colors"
```

## Step 3: Create GitHub Repository
1. Go to https://github.com and sign in to your account
2. Click on the "New" button to create a new repository
3. Enter a repository name (e.g., osian-enterprise-website)
4. Select public or private visibility
5. Do NOT initialize with a README.md, .gitignore, or license
6. Click "Create repository"

## Step 4: Add Remote Origin
After creating the repository, you'll see instructions to "…or push an existing repository from the command line". Run the commands similar to:

```bash
git remote add origin https://github.com/your-username/osian-enterprise-website.git
git push -u origin main
```

## Step 5: Verify Your Repository
1. Refresh your GitHub repository page
2. You should see all your project files listed
3. The commit message should be "Initial commit with theme fixes and gradient colors"

## Step 6: Install GitHub Desktop (Optional but Recommended)
For easier git management, you can install GitHub Desktop:
https://desktop.github.com/

## Additional Tips
- Create a .gitignore file to exclude unnecessary files from version control
- Consider creating a README.md to document your project
- Create branches for future development
- Use pull requests to review changes before merging to main

## Common Issues
If you encounter any issues:
1. Make sure Git is properly installed and configured
2. Check your internet connection
3. Verify that you have the correct repository URL
4. Check that you have permission to push to the repository

Let me know if you need help with any of these steps!