# Schema for PostgreSQL

## Existing tables

No existing tables yet

## Tables todo

| Restaurants | type | example data |
| --- | --- | --- |
| id | int | 600 |
| name | text | Chemicum |

| Biowaste | type | example data |
| --- | --- | --- |
| id | int | |
| date | date |
| restaurant_id | int | 600 |
| biowaste_customer | float | |
| biowaste_coffee | float | |
| biowaste_kitchen | float | |
| biowaste_hall | float | |

| Customers_per_X | type | example data |
| --- | --- | --- |
| id | int |
| date | date |
| hour | int |
| amount | int |
| restaurant_id | int | 600 |

| Category | type | example data |
| --- | --- | --- |
| id | int |
| name | text unique | Vegaani |

| Dishes | type | example data |
| --- | --- | --- |
| id | int |
| name | text | Marokkolainen linssipata |
| category_id | int |

NB! Make sure that if two dishes have same name but different categories, both are included.

| Sold_lunches | type | example data |
| --- | --- | --- |
| id | int | |
| date | date |
| time | time |
| restaurant_id | int | 600 |
| dish_id | text |
| amount | int |

## Possible tables later

* Academic_years
* Restaurant_open_times
* Results