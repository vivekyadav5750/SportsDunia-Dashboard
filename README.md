# Sports Dunia Dashboard  

## Project Overview  
The **Sports Dunia Dashboard** is a responsive web application that provides analytics, data export options, and payout management for articles and blogs. It includes a variety of features designed to enhance user experience and productivity.  

---

## Features  

### **Authentication**  
- Login via email.  
- GitHub OAuth .  

### **Dashboard Modules**  
1. **Overview**  
   - Displays the total number of articles/blogs fetched from the API.  
   - Visual representation of payouts using charts.  
   - Real-time filters that dynamically update payouts.  
   - Export options for CSV and PDF (complete or filtered data).  

2. **Articles Section**  
   - Lists all articles and blogs.  
   - Filters by author, date, and global search.  
   - Displays payout prices for each article/blog.  

3. **News Analysis**  
   - Graphical charts (e.g., pie charts, bar charts) showing article trends by author.  

4. **Payout Details**  
   - A table displaying authors, articles, and calculated payouts.  
   - Editable payouts for individual articles/blogs.  
   - Input box to set common payouts for all articles/blogs.  
   - Export payout details (complete or filtered) as CSV and PDF.  

5. **UI and Design**  
   - **Dark Mode**: Toggleable dark mode for improved accessibility.  
   - Fully responsive design compatible with mobile and desktop devices.  

6. **SEO Enhancements**  
   - Sitemap generation (`sitemap.ts`).  
   - Metadata for dynamic pages.  
   - Markup schema for better search engine indexing.  

---

## Technical Details  

### **Built With**  
- **Frontend**: Next.js, Tailwind CSS.  
- **State Management**: Redux.  
- **Charts**: Chart.js for graphical data representation.  
- **Export**:  
  - **CSV**: Custom implementation.  
  - **PDF**: jsPDF with `autoTable`.  

### **Key Features**  
- Dark mode and responsive UI for both mobile and desktop.  
- Export options for filtered and complete data (CSV and PDF).  
- Real-time filter updates for dynamic data visualization.  
- SEO-friendly structure with sitemaps and schemas.  

---

## Environment Variables  
To run the project locally, create a `.env` file in the root directory with the following fields:  

```plaintext
NEXTAUTH_URL=<Your deployment URL>
NEXTAUTH_SECRET=<Your secret key for NextAuth>
NEXT_PUBLIC_NEWS_API_KEY=<API key for News API>
GITHUB_ID=<Your GitHub OAuth App client ID>
GITHUB_SECRET=<Your GitHub OAuth App client secret>
```
---

## Links  
- **GitHub Repository**: [GitHub Link](https://github.com/vivekyadav5750/SportsDunia-Dashboard)  
- **Deployed Application**: [Deployment Link](https://sports-dunia-dashboard.vercel.app/)  
- **Demo Video**: [Video Link](https://drive.google.com/file/d/1Q47PK3GymLe6i_wuhtYa2RvCjEBZzCDF/view?usp=drivesdk)  
