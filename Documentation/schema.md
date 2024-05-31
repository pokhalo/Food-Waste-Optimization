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
| restaurant_id | int | 600 |
| biowaste_customer | float | |
| biowaste_coffee | float | |
| biowaste_kitchen | float | |
| biowaste_hall | float | |

| Sold_lunches | type | example data |
| --- | --- | --- |
| id | int | |
| date | date |
| time | time |
| restaurant_id | int | 600 |
| category | text |
| dish | text |
| amount | int |

| Customers_per_X | type | example data |
| --- | --- | --- |
| id | int |
| date | date |
| hour | int |
| amount | int |
| restaurant_id | int | 600 |

## Possible tables later

Academic_years

Restaurant_open_times