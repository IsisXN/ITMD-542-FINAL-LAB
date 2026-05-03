# ITMD-542-FINAL-LAB

## Project Overview
My project is a portfolio and showcase manager that also allows users to make photography bookings with me, it is built with Next.js, Prisma, and PostgreSQL. It includes the following pages, home, photography, projects, and a bookings page along with a simple database manager page used to create, read, update, and delete project entries. Projects features graphic desighns and flyers ive made for the oranizations im apart of on campus, which includes SHPE, ALPFA and photography club. my photography page includes candid and edited pictures ive taken while traveling as well as my time as a hired photographer for the exelon summer institute and other events. my home page just features my photo and more about who iam so users can get to know the photographer and my skills and other ways to reach me with social links. 

## Features
- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL database
- Public portfolio pages
- Public booking request form
- Protected manager pages with a simple passcode gate
- CRUD functionality for project entries and booking requests
- Deployment through Vercel

## Pages
- `/` Home page
- `/photography` Photography gallery
- `/projects` Organization project showcase
- `/manage` CRUD for project entries

## Data Model
The app uses a `ProjectEntry` model with:
- title
- organization
- description
- image Url
- display Order

## Local Development
Install dependencies:

```bash
npm install

## Future edits 
 - make a portfolio teplate?
 - make it a portfolio manager app 
# with more time
 - maybe auth
 - maybe multiple users
 - maybe more tables
