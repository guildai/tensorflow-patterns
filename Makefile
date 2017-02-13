build:
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

clean:
	bundle exec jekyll clean

spell-list:
	@for f in `find -name "*.md"`; do \
	  if aspell list -p ./aspell-words < "$$f" | grep -v "^$$"; then \
	    echo "ERROR: $$f contains unknown words - see list above"; \
	    exit 1; \
	  fi \
	done

spell-check:
	@for f in `find -name "*.md"`; do \
	  aspell check -p ./aspell-words "$$f"; \
	done
