update item
   set 
        name = ${name},
        img_url = ${img_url},
        description = ${description},
        tags = ${tags}
 where item_id = $(item_id);
