class Item < ActiveRecord::Base
  def markup
    filter = HTML::Pipeline::MarkdownFilter.new(body)
    self.rendered_body = filter.call
  end
end
