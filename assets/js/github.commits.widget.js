/*

https://github.com/alexanderbeletsky/github-commits-widget

# Legal Info (MIT License)

Copyright (c) 2012 Alexander Beletsky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

(function ($) {
    function widget(element, options, callback) {
        this.element = element;
        this.options = options;
        this.callback = $.isFunction(callback) ? callback : $.noop;
    }

    widget.prototype = (function() {

        function getCommits(user, repo, branch, callback) {
            $.ajax({
                url: "https://api.github.com/repos/" + user + "/" + repo + "/commits?sha=" + branch,
                dataType: 'jsonp',
                success: callback
            });
        }

        function _widgetRun(widget) {
            if (!widget.options) {
                widget.element.append('<span class="error">Options for widget are not set.</span>');
                return;
            }
            var callback = widget.callback;
            var element = widget.element;
            var user = widget.options.user;
            var repo = widget.options.repo;
            var branch = widget.options.branch;
            var avatarSize = widget.options.avatarSize || 30;
            var last = widget.options.last === undefined ? 10 : widget.options.last;
            var limitMessage = widget.options.limitMessageTo === undefined ? 0 : widget.options.limitMessageTo;

            getCommits(user, repo, branch, function (data) {

                var commits = data.data;
                var totalCommits = (last < commits.length ? last : commits.length);

                element.empty();

                var list = $('<ul class="github-commits-list">').appendTo(element);
                for (var c = 0; c < totalCommits; c++) {
                    var cur = commits[c];
                    var li = $("<li>");

                    var e_user = $('<span class="github-user">');
                    if (cur.author !== null) {
                        e_user.append(avatar2(cur.author, avatarSize));
                    }
                    else
                    {
                        e_user.append(avatar3(cur.commit.committer, avatarSize));
                    }

                    li.append(e_user);

                    li.append(message2(cur.commit.message, cur.sha, when(cur.commit.committer.date)));

                    list.append(li);
                }


                callback(element);

                function avatar(hash, size) {
                    return $('<img>')
                        .attr('class', 'github-avatar')
                        .attr('src', 'https://www.gravatar.com/avatar/' + hash + '?s=' + size);
                }

                function avatar2(author, size) {
                    return $('<img>')
                        .attr('class', 'github-avatar')
                        .attr('src', author.avatar_url)
                        .attr('width', size)
                        .attr('title', author.login);
                }

                function avatar3(committer, size) {
                    return $('<img>')
                        .attr('class', 'github-avatar')
                        .attr('src', 'https://assets-cdn.github.com/images/gravatars/gravatar-user-420.png')
                        .attr('width', size)
                        .attr('title', committer.name);
                }
                  
                function author(login) {
                    return  $('<a>')
                        .attr("href", 'https://github.com/' + login)
                        .text(login);
                }

                function message(commitMessage, sha) {
                    var originalCommitMessage = commitMessage;
                    if (limitMessage > 0 && commitMessage.length > limitMessage)
                    {
                        commitMessage = commitMessage.substr(0, limitMessage) + '...';
                    }

                    var link = $('<a class="github-commit"></a>')
                        .attr("title", originalCommitMessage)
                        .attr("href", 'https://github.com/' + user + '/' + repo + '/commit/' + sha)
                        .text(commitMessage);

                    return link;
                }

                function message2(msg, sha, commitWhen) {
                    var lineOne = msg.split("\n", 1)[0]
                    return $('<a class="github-commit"></a>')
                        .attr("href", 'https://github.com/' + user + '/' + repo + '/commit/' + sha)
                        .attr("title", commitWhen)
                        .text(lineOne)
                }

                function when(commitDate) {
                    var commitTime = new Date(commitDate).getTime();
                    var todayTime = new Date().getTime();

                    var differenceInDays = Math.floor(((todayTime - commitTime)/(24*3600*1000)));
                    if (differenceInDays === 0) {
                        var differenceInHours = Math.floor(((todayTime - commitTime)/(3600*1000)));
                        if (differenceInHours === 0) {
                            var differenceInMinutes = Math.floor(((todayTime - commitTime)/(600*1000)));
                            if (differenceInMinutes === 0) {

                                return 'just now';
                            }

                            return 'about ' + differenceInMinutes + ' minutes ago';
                        }

                        return 'about ' + differenceInHours + ' hours ago';
                    } else if (differenceInDays == 1) {
                        return 'yesterday';
                    }
                    return differenceInDays + ' days ago';
                }
            });
        }

        return {
            run: function () {
                _widgetRun(this);
            }
        };

    })();

    $.fn.githubInfoWidget = function(options, callback) {
        this.each(function () {
            new widget($(this), options, callback)
                .run();
        });
        return this;
    };

})(jQuery);
