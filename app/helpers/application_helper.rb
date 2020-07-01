module ApplicationHelper
  # change the default link renderer for will_paginate. Needed for formatting
  def will_paginate(collection_or_options = nil, options = {})
    if collection_or_options.is_a? Hash
      options, collection_or_options = collection_or_options, nil
    end
    unless options[:renderer]
      options = options.merge :renderer => MaterializeLinkRenderer
    end
    super *[collection_or_options, options].compact
  end
end

class MaterializeLinkRenderer < WillPaginate::ActionView::LinkRenderer
  protected
    def page_number(page)
      unless page == current_page
        tag(:li, link(page, page, :rel => rel_value(page)), :class => 'waves-effect')
      else
        tag(:li, link(page, page, :rel => rel_value(page)), :class => 'active')
      end
    end

    def previous_or_next_page(page, text, classname)
      if classname == 'previous_page'
        icon = tag(:i,'chevron_left' ,class: 'material-icons')
      elsif classname == 'next_page'
        icon = tag(:i,'chevron_right' ,class: 'material-icons')
      end
      if page
        link(icon, page, :class => classname)
      else
        tag(:li, icon ,:class => classname + ' disabled')
      end
    end

    def html_container(html)
      tag(:ul, html, class: 'pagination center')
    end
end
