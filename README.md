### College : 
- Solapur  Education Society,solapur
### Group Members :
- Gaurav Jadkar
- Koushik Chilveri
- Abhishek Mhetre
- Arjun Uttarkar
- Arya Haridas

### 🚗 Vehicle Rental System

A full-stack web application for renting vehicles online. This system allows customers to register, log in, browse vehicles, book rentals, and manage their profile.

---

## 📌 Features

- ✅ Customer Registration
- ✅ Login via UserID
- ✅ Browse Available Vehicles by Type & Date
- ✅ Book Vehicle 
- ✅ View Rental Vehicle's History
- ✅ Customer Profile
- ✅ Logout Functionality 
---

## 🛠 Tech Stack

### 🔹 Frontend
- html, css, typescript(angular).

### 🔹 Backend
- Java with Spring Boot
- RESTful APIs
- JPA/Hibernate (for database interaction)

### 🔹 Database
- PostgreSQL

---

## 📂 Project Structure

org.System/<br>
├── src/main/resources/<br>
├── src/main/java/org/<br>
│ ├── system/vehiclerentlesystem_angular/frontend  # Controllers,services,angular and frontend<br>
│ ├── repositories/ # Spring Data JPA Repositories<br>
│ ├── Entities/ # JPA Entities like Customer, Vehicle, Rental<br>
│ └── VehicleRentalApplication.java<br>
├── src/main/resources/<br>
│ └── application.properties<br>
└── README.md

---
spring.datasource.url=jdbc:mysql://localhost:3306/vehicle_rental<br>
spring.datasource.username=root<br>
spring.datasource.password=yourpassword<br>
spring.jpa.hibernate.ddl-auto=update<br>
---

| Endpoint                                   | Method | Description           |
| ------------------------------------------ | ------ | --------------------- |
| `/api/VehicleRentalSystem/vehicles`        | GET    | Get all vehicles      |
| `/api/VehicleRentalSystem/register`        | POST   | Register new customer |
| `/api/VehicleRentalSystem/login`           | POST   | Authenticate customer |
| `/api/VehicleRentalSystem/book`            | POST   | Book vehicle          |

 
## 🔒 Authentication
  - localStorage.setItem("customer_id", custId);
---
## 📷 Snapshot
[![](https://github.com/gauravjadkar/com.Angular_VRS/blob/main/Screenshot%202025-08-20%20195604.png)]
---

#### Made for Educational Purpose 




