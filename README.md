# ITMD-542-FINAL-LAB

## Project Overview
My project is portfolio and organization showcase built with Next.js, Prisma, and PostgreSQL. It includes the folllowing pages, home, photography, and projects, along with a simple database manager page used to create, read, update, and delete project entries. Projects features graphic desighns and flyers ive made for the oranizations im apart of on campus, which includes SHPE, ALPFA and photography club. my photography page includes candid and edited pictures ive taken while traveling as well as a hired photographer for the exelon summer institute and events. my home page just features my background and more about who iam. 

## Features
- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL database
- CRUD for project entries
- Deployed on Vercel

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