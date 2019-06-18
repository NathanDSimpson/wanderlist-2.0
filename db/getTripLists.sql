select l.list_id, l.name, l.description from trip_list as tl
join list as l on l.list_id = tl.list_id
where tl.trip_id = ${trip_id};
