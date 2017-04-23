module ApplicationHelper
  def full_title(page_title = '')
    base_title = "My App"
    if !page_title.empty?
      base_title = page_title + " | " +  base_title
    else
      
    end
    return base_title
  end
end
