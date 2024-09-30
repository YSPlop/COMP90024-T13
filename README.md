# COMP90024 Cluster and Cloud Computing - Assignment 2

### Team 13

**Team Members:**

- **Yukash Sivaraj** - 1054297  
- **Alex Wang** - 1427869  
- **Eldon Yeh** - 1276574  
- **Ka Shun Carson Young** - 1086178  

---

## Project Overview

This project demonstrates a social media data analysis application deployed on a cloud infrastructure. The application analyzes Twitter and Mastodon data, performs sentiment analysis, and visualizes the data in relation to social indicators from the Spatial Urban Data Observatory (SUDO). The main objective is to explore the relationship between social media aggression and violence with various official social indicators such as education levels, family stress, and income distribution.

This application is deployed on the **Melbourne Research Cloud (MRC)** and leverages CouchDB for data storage, Docker for containerization, and Ansible for automated deployment.

### Features:

- **Automated Deployment:** Using Ansible scripts for automated setup of the cloud infrastructure and application deployment.
- **Dynamic Scaling:** The system can dynamically scale Mastodon harvesters to handle hashtag data collection without service interruption.
- **Sentiment Analysis:** NLP-based sentiment analysis of Mastodon and Twitter data using NLTK’s Vader.
- **Data Visualisation:** Interactive visualizations including choropleth maps, scatter plots, and violin plots to analyze the correlation between social indicators and sentiment analysis.

## Table of Contents

1. [Team Workflow](#team-workflow)
2. [System Functionalities](#system-functionalities)
3. [Data Analysis](#data-analysis)
4. [User Guide](#user-guide)
5. [System Design and Architecture](#system-design-and-architecture)
6. [Error Handling](#error-handling)
7. [UniMelb Research Cloud Discussion](#unimelb-research-cloud-discussion)
8. [Demonstration](#demonstration)
9. [Appendix](#appendix)
10. [References](#references)

## Team Workflow

- **Project Management:** We used **Trello** to manage tasks and keep track of the progress for frontend, backend, data science, and reporting tasks.
- **Version Control:** All code is maintained in this **GitHub repository** to ensure proper collaboration and version management. Please refer to the Appendix for the GitHub link.

---

## System Functionalities

### 1. Automated Deployment
The system is fully automated and can be deployed via scripts on the MRC frontend instance. These scripts handle the setup of cloud resources, CouchDB databases, and Docker containers for the frontend, backend, and data harvesters.

### 2. Dynamic Scaling
The Mastodon harvester containers can be scaled dynamically by specifying hashtags in a configuration file. Containers are spun up or down based on the active hashtags being processed.

### 3. Sentiment Analysis
The project uses **NLP (Natural Language Processing)** techniques to analyze sentiment from Twitter and Mastodon posts. The sentiment is categorized as "non-aggressive" or "aggressive" based on predefined thresholds.

---

## Data Analysis

### 1. Data Collection
Data from **Mastodon**, **Twitter**, and **SUDO** were harvested and processed:
- **Mastodon Data:** Harvested in real-time using the Mastodon API.
- **Twitter Data:** Cleaned and processed for geolocation and sentiment analysis.
- **SUDO Data:** Social indicators such as family stress, income distribution, and educational attainment were retrieved from the Spatial Urban Data Observatory.

### 2. Visualization
The following visualizations were implemented:
- **Choropleth Maps:** Displaying social indicators and sentiment scores at the Local Government Area (LGA) level.
- **Scatter Plots:** Showing correlations between sentiment scores and social indicators.
- **Violin Plots:** Depicting the distribution of social indicators across LGAs.

---

## User Guide

To deploy the system, follow these steps:

1. **SSH into the frontend instance** of the MRC cloud.
   
2. Run the following scripts to start various services:
   
   ```bash
   # Setup VM environment
   cd /home/ubuntu/COMP90024-T13/vm-setup && ./setup-vms.sh

   # Start CouchDB
   cd /home/ubuntu/COMP90024-T13/frontend && ./start-frontend.sh

   # Start frontend
   cd /home/ubuntu/COMP90024-T13/frontend && ./start-frontend.sh

   # Start backend
   cd /home/ubuntu/COMP90024-T13/backend && ./start-backend.sh

   # Start harvesters
   cd /home/ubuntu/COMP90024-T13/backend && ./start-harvesters.sh
   ```

3. Access the web application at `http://172.26.134.22/` in your browser. You may need to use **Unimelb VPN** or be connected to the **University Wi-Fi**.

---

## System Design and Architecture

The system architecture is built on **Docker containers** and deployed on **Melbourne Research Cloud (MRC)**:

- **VMs:** 6 VMs were created to host the frontend, backend, CouchDB, and harvester components.
- **Containers:** The application services were containerized using Docker, and the system is orchestrated using Ansible scripts for easy deployment and scaling.
- **Database:** A 3-node **CouchDB** cluster stores Mastodon, Twitter, and SUDO datasets.
- **Frontend:** Developed in **React.js** and **Material UI** to present visualizations and graphs.
- **Backend:** Python Flask is used for routing, API, and backend functionality.

---

## Error Handling

### Common Issues:
- **Security Group Errors:** We encountered issues with MRC security groups not updating, which were resolved by contacting MRC support.
- **Mastodon API Issues:** Server errors occasionally stopped the Mastodon harvester, resolved by using Docker's automatic restart feature.
- **React and Flask:** Some asynchronous issues between the React frontend and Flask backend were solved by making API calls asynchronous.
  
---

## UniMelb Research Cloud Discussion

The **Melbourne Research Cloud (MRC)** provided the infrastructure for this project. While MRC offers on-demand computing resources similar to AWS, there were limitations such as the number of CPU cores and time-consuming setups due to manual configuration requirements.

---

## Demonstration

Check out the following video demonstrations for a walkthrough of the web application and Ansible scripts:

- [Web Application Demo](https://youtu.be/x5DTTtSWzsc)
- [Ansible Scripts Demo](https://youtu.be/HQcAQ2iGMdA)

---

## Appendix

### VM Specifications:

| Instance  | RAM (GB) | CPUs |
|-----------|----------|------|
| frontend  | 4        | 1    |
| backend   | 9        | 2    |
| db-1      | 4        | 1    |
| db-2      | 4        | 1    |
| db-3      | 4        | 1    |
| harvester | 9        | 2    |

### Security Rules:

| Instance | Allowed Ingress Ports |
|----------|-----------------------|
| frontend | 22, 80                |
| backend  | 22, 80, 8081          |
| db-1, db-2, db-3 | 22, 5984      |
| harvester | 22                   |

### Containers:

| Instance  | Containers                  |
|-----------|-----------------------------|
| frontend  | Nginx, Node                  |
| backend   | Python, Nginx, Node          |
| db-1, db-2, db-3 | CouchDB               |
| harvester | n Python containers          |

---

## References

- Bakshy, E., Messing, S., & Adamic, L. A. (2015). Exposure to ideologically diverse news and opinion on Facebook. *Science, 348*(6239), 1130–1132.
- Hutto, C.J. & Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. *Eighth International Conference on Weblogs and Social Media (ICWSM-14)*. Ann Arbor, MI, June 2014.
- Victorian Child and Adolescent Monitoring System (VCAMS). Victorian Government. (2014). https://www.vic.gov.au/victorian-child-and-adolescent-monitoring-system
