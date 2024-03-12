# README

> In the process of writing the documentation...

`vw_member_organizations` - It provides the memeber's associated organizations. The view retrieves data from two tables: `**mo_association**` and `**organizations**`.

```
create view
  public.vw_member_organizations as
select
  mo_association.member_id,
  organizations.organization_id,
  organizations.organization_name
from
  mo_association
  left join organizations on mo_association.organization_id = organizations.organization_id;
```
`vw_organization_info`  - It provides information about an organizations and their members. It combines data from the `organizations` and `members` tables via the `mo_association` table.

```sql
create view
  public.vw_organization_info as
select
  organizations.organization_id,
  organizations.organization_name,
  members.id,
  members.first_name,
  members.last_name,
  members.username,
  members.role,
  members.contact,
  members.email,
  members.registered_date
from
  mo_association
  left join members on mo_association.member_id = members.id
  left join organizations on mo_association.organization_id = organizations.organization_id;
```
# Data Fetching Pattern

![pattern-diagram](https://github.com/aidrecabrera/chrono-ledger/assets/61798731/60fb83ac-d306-4c37-b24e-91bd17365d00)

### Usage
1. Ensure proper import of store hooks (`useStoreA` , `useStoreB` ).
    1. `Store A` is the state management store for the data.
    2. `Store B` is the state management store for the channel (this is global).
2. Customize the pattern according to your specific store structure and data requirements.
3. Replace placeholders such as `data` , `storeA` , `storeB` , and `"target_table"`  with appropriate names in your implementation.
#### Import the Stores
```
const storeA = useStoreA();
const storeB = useStoreB();
```
#### Fetch the Data on Mount
```javascript
onMounted(() => {
    if (data !== null) {
        storeA.fetchData();
    }
});
```
- `onMounted` : Vue Composition API hook that runs the provided callback function when the component is mounted.
- `data` : Placeholder for the data that triggers fetching. Replace with your condition.
- `storeA.fetchData()` : Method to fetch data from `storeA` .
#### Computed Property for Accessing Data
```javascript
const data = computed(
    () => storeA.$state.data
);
```
- `computed` : Vue Composition API function that creates a reactive computed property.
- `data` : Computed property that returns the desired data from `storeA` .
#### Subscribe to Realtime Updates

```javascript
storeB.$subscribe((_, state) => {
    if (state.payload?.table === "target_table") {
        storeA.fetchData();
    }
});
```
- `storeB.$subscribe` : Subscribes to updates from `storeB` .
- The callback function checks if the payload table matches the target table and triggers fetching data from `storeA`  accordingly.
Example Implementation in the Codebase

```javascript
const aoManagementStore = useAoManagementStore();
const realtimeChannelStore = useRealtimeChannelStore();

// Initially fetch the data from aoManagementStore on component mount
onMounted(() => {
    // Avoid re-fetching if data is already present
    // If there is no data stored, then we fetch it.
    if (ao_management_data !== null) {
        aoManagementStore.fetchData(); // Fetch data from aoManagementStore
    }
});

// Computed property for accessing ao_management data
const ao_management_data = computed(
    () => aoManagementStore.$state.ao_management
);

// Subscribe to realtime updates from realtimeChannelStore
realtimeChannelStore.$subscribe((_, state) => {
    // Check if the payload table is "ao_management"
    if (state.payload?.table === "ao_management") {
        aoManagementStore.fetchData(); // Fetch data from aoManagementStore
    }
});
```
