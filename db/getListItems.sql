
select i.item_id, i.name, li.quantity, i.img_url, i.weight, i.volume, i.description from list_item as li
join item as i on i.item_id = li.item_id
where li.list_id = ${list_id};