# BubbleRoot Studios Website

A modern, responsive website for BubbleRoot Studios - a full-service creative and digital agency based in Bushbuckridge, South Africa.

## Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations and hover effects
- **AI Image Generator** - Built-in free AI image generation tool (currently mock implementation)
- **Affiliate Program** - Online registration system for affiliate partners
- **Contact Forms** - Interactive contact and affiliate registration forms
- **Service Showcase** - Comprehensive overview of all services offered
- **SEO Optimized** - Proper meta tags and structured content for search engines

## Brand Colors

- **Primary Blue**: #0057B8
- **Secondary Teal**: #00B3A1
- **Accent White**: #FFFFFF
- **Text Dark**: #333333
- **Text Light**: #666666

## Typography

- **Primary Font**: Montserrat (headings)
- **Secondary Font**: Roboto (body text)

## Services

### Creative Services
- Logo & Brand Identity Design
- Poster, Flyer, & Brochure Design
- Social Media Content Creation
- Professional Mockups & Previews

### Printing & Branding
- Business Cards & Marketing Materials
- Banners & Signage Production
- Vehicle Branding & Decals
- Large Format Printing

### Web Development
- Custom Website Development
- E-commerce Platform Creation
- CMS Integration
- Performance Optimization

### Digital Marketing
- Social Media Strategy
- Video Advertisement Production
- SEO & PPC Campaigns
- Email Marketing

### Business Administration
- CV Writing & Formatting
- Document Creation & Editing
- Company Registration Support
- Professional Report Formatting

### Technology & IT Solutions
- Software Installation & Setup
- Network Configuration
- Cloud Integration Services
- Technical Support

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/NewaySecurity/bubbleroot.git
   cd bubbleroot
   ```

2. **Add your logo**
   - Place your logo file in the `assets/` folder
   - Name it `bubbleroot-logo.png` or update the image paths in `index.html`

3. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: (leave empty for static site)
   - Set publish directory: `/` (root directory)
   - Deploy automatically on push to main branch

4. **Optional: Add Real AI Image Generation**
   - Sign up for a free AI image generation API (DeepAI, Replicate, etc.)
   - Update the JavaScript in `script.js` to integrate with the actual API
   - Add environment variables for API keys in Netlify

## File Structure

```
bubbleroot/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Images and media files
│   └── bubbleroot-logo.png
└── README.md           # This file
```

## Contact Information

- **Email**: info@bubblerootstudios.co.za
- **Phone**: 072 683 9367 / 071 528 8404
- **Location**: Bushbuckridge, South Africa

## License

© 2024 BubbleRoot Studios. All rights reserved.

## Development Notes

- The AI image generator currently uses a mock implementation
- Forms use basic JavaScript validation and alerts
- All external dependencies are loaded via CDN
- The site is fully responsive and mobile-friendly
- SEO meta tags are included for better search visibility

## Next Steps

1. Add your actual logo to the assets folder
2. Connect to Netlify for deployment
3. Integrate real AI image generation API
4. Set up form handling (Netlify Forms or external service)
5. Add Google Analytics tracking
6. Configure social media links
7. Add more detailed service pages if needed
