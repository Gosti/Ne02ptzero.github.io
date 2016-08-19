$(function () {
	var		currentCmd, content, current = 0, pwd = "~";

	var		cmds = [
		{
			cmd: "mkdir server",
		},
		{
			cmd: "ls",
			result: "<span class='folder'>server</span>"
		},
		{
			cmd: "cd server",
			pwd: "~/server"
		},
		{
			cmd: "vim main.c",
			callback: vim,
			result: "[1]  + 9775 suspended  vim main.c\n(pwd now: ~/server)"
		},
		{
			cmd: "gcc main.c -O2 -o server"
		},
		{
			cmd: "ls",
			result: "main.c <span style='color: rgb(98, 227, 98)'>server</span>"
		},
		{
			cmd: "touch index.html",
		},
		{
			cmd: "./server &",
			result: "[2] 19908"
		},
		{
			cmd: "fg",
			callback: re_vim
		},
		{
			cmd: "exit",
			callback: function() {
				$(".preview").animate({"width": "100%"}, 1000);
				$("#skip").hide();
				$(".lines").remove();
			}
		}
	];

	function		command() {
		$(".typed-cursor").remove();
		content.find("#content").typed({
			strings: [cmds[current].cmd],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			callback: result,
			contentType: 'text'
		});
	}

	function		result() {
		if (cmds[current].callback != undefined) {
			cmds[current].callback();
			return ;
		}
		else if (cmds[current].result != undefined)
			content.find("#result").append(cmds[current].result);
		current++;
		main();
	}

	$(".tmp").typed({
		strings: ["^1000Uh.\n^1000Website ?\n^500Please ?\n^2000*sigh*\n^500All right, let's make this work.^500\n/clear\n"],
		typeSpeed: 0,
		showCursor: true,
		cursorChar: '▊',
		contentType: 'text',
		callback: function() {
			$(".tmp").remove();
			main();
		}
	});

	function		main() {
		$(".console").append("<div class='command-"+ current +"'>" + $(".vanilla").html() + "</div>");
		content = $(".command-"+ current);
		$(".typed-cursor").remove();
		content.find("#content").append("<span class=\"typed-cursor\">▊</span>");
		content.find(".pwd").html(pwd);
		if (cmds[current] != undefined) {
			if (cmds[current].pwd != undefined)
				pwd = cmds[current].pwd;
			setTimeout(command, 500);
		}
	}

	function		vim() {
		$(".console").hide();
		$(".vim").show();
		$(".vim .st").removeClass("normal");
		$(".vim .st").addClass("insert");
		$(".vim .st").html("INSERT");
		$(".vim #content").typed({
			strings: [res.value],
			typeSpeed: -100,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".vim .st").removeClass("insert");
				$(".vim .st").addClass("normal");
				$(".vim .st").html("NORMAL");
				$(".vim .cmd").typed({
					strings: [":w"],
					typeSpeed: 0,
					showCursor: true,
					cursorChar: '▊',
					startDelay: 1000,
					callback: function() {
						$(".typed-cursor").remove();
						setTimeout(closeVim, 3000);
					}
				});
			}
		});
	}

	function	closeVim() {
		$(".vim").hide();
		$(".console").show();
		content.find("#result").append(cmds[current].result);
		current++;
		main();
	}

	function	re_vim() {
		$(".console").hide();
		$(".vim .cmd").html("");
		$(".vim").show();
		$(".vim .cmd").typed({
			strings: [":e index.html"],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".vim .menu").html("<span style=\"color: green\"> 1</span>+ index.html");
				$(".vim .status .fd").html("index.html");
				$(".vim .status .infos").html("unix | utf-8 | HTML");
				$(".vim .file #content").html("");
				$(".vim .cmd").html("");
				$(".typed-cursor").remove();
				$(".vim .st").removeClass("normal");
				$(".vim .st").addClass("insert");
				$(".vim .st").html("INSERT");

				website();
			}
		});
	}

	function website() {
		$(".vim #content").typed({
			strings: html,
			typeSpeed: -50,
			showCursor: true,
			cursorChar: '▊',
			callback: function() {
				$(".vim").animate({"width": "70%"}, 1000);
				$(".vim .status").animate({"width": "70%"}, 1000);
				$(".vim .infos").animate({"right": "30%"}, 1000, function() {
					$(".preview").show();
					$(".preview").html(o_html);
					$(".vim .file").append('<span id="content2" style="white-space:pre"></span>');
					$(".typed-cursor").remove();
					$(".vim #content2").typed({
						strings: html2,
						typeSpeed: 0,
						showCursor: true,
						cursorChar: '▊',
						callback: function() {
							$(".vim .st").removeClass("insert");
							$(".vim .st").addClass("normal");
							$(".vim .st").html("NORMAL");
							style();
						}});
				});
			}
		});
	}

	function	style() {
		$(".vim .cmd").typed({
			strings: [":e style.css"],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".vim .menu").html("<span style=\"color: green\"> 1</span>+ style.css");
				$(".vim .status .fd").html("style.css");
				$(".vim .status .infos").html("unix | utf-8 | CSS");
				$(".vim .file #content").html("");
				$(".vim .file #content2").html("");
				$(".vim .cmd").html("");
				$(".typed-cursor").remove();
				$(".vim .st").removeClass("normal");
				$(".vim .st").addClass("insert");
				$(".vim .st").html("INSERT");
				write_style();
			}
		});
	}

	function 	write_style() {
		$(".vim #content").typed({
			strings: css1,
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".preview").css({
					"text-align": "center",
					"background": "#1E1E20",
					"color": "rgba(222, 209, 169, 1)",
					"font-family": "Open Sans",
					"font-size": "1.3em"
				});
				$(".typed-cursor").remove();
				setTimeout(write_style_2, 1000);
			}
		});
	}

	function write_style_2() {
		$(".vim #content2").typed({
			strings: css2,
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".preview h1").css({
					"margin-top": "15%",
					"margin-bottom": "3%",
					"font-size": "3.5em"
				});
				$(".preview a").css({
					"text-decoration": "none",
					"color": "#374140",
					"transition-property": "all",
					"transition-duration": "0.3s"
				});
				$(".preview a i").css({
					"font-size": "2em",
					"margin-right": "1%",
					"margin-left": "1%"
				});
				setTimeout(done, 2000);
			}
		});
	}

	function	done() {
		$(".typed-cursor").remove();
		$(".vim .file").append('<span id="content3" style="white-space:pre"></span>');
		$(".vim #content3").typed({
			strings: css3,
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			callback: function() {
				$(".vim .st").removeClass("insert");
				$(".vim .st").addClass("normal");
				$(".vim .st").html("NORMAL");
				$(".vim .cmd").typed({
					strings: [":wq"],
					typeSpeed: 0,
					showCursor: true,
					cursorChar: '▊',
					startDelay: 1000,
					callback: function() {
						$(".typed-cursor").remove();
						setTimeout(closeVim, 1000);
					}
				});

			}
		});
	}

	function	skip() {
		$(".preview").html(o_html);
		$(".preview h1").css({
			"margin-top": "15%",
			"margin-bottom": "3%",
			"font-size": "3.5em"
		});
		$(".preview a").css({
			"text-decoration": "none",
			"color": "#374140",
			"transition-property": "all",
			"transition-duration": "0.3s"
		});
		$(".preview a i").css({
			"font-size": "2em",
			"margin-right": "1%",
			"margin-left": "1%"
		});
		$(".preview").css({
				"text-align": "center",
				"background": "#1E1E20",
				"color": "rgba(222, 209, 169, 1)",
				"font-family": "Open Sans",
				"font-size": "1.3em"
		});
		$("#skip").hide();
		$(".preview").show();
		$(".preview").animate({"width": "100%"}, 1000);
		$(".lines").remove();
	}

	$("#skip").on('click', function() {
		skip();
		$("#skip").hide();
	});

	hljs.configure({
		languages:["C", "HTML", "CSS"]
	});
	var res = hljs.highlight("C", file);
	html[2] = hljs.highlight("HTML", html[2]).value;
	html2[0] = hljs.highlight("HTML", html2[0]).value;
	css1[0] = hljs.highlight("CSS", css1[0]).value;
	css2[0] = hljs.highlight("CSS", css2[0]).value;
	css3[0] = hljs.highlight("CSS", css3[0]).value;
});

var html = [
	"Phew, that's done.^500\nNow let's code the site.^1000",
	"Machine,^500\n\nPls make website,^500\n\nall responsive like,^500\nw/ BIG pictures ooo^500,\nuse my fav fonts^1000,\nalso fancy menus with whoosh on,^500\nload fast pls^200\n\nThanks,\nHuman\n\n^1500PS no bugs :)^500\n^500\n^500\n^1500.^1500.^1500.^2000\n\nDoesn't work?\n\n^1000Damnit.",
	'<!DOCTYPE HTML>\n<html lang="en">\n	<head>\n		<!-- CSS Declaration -->\n			<link href="http://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet" type="text/css">\n			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">\n			<link href="style.css" rel="stylesheet">\n\n		<!-- JS import -->\n			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\n			<script src="js/script.js"></script>\n\n		<!-- META Declaration -->\n			<meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui">\n			<meta name="description" content="Another useless website.">\n			<meta name="author" content="Louis Solofrizzo">\n			<meta name="keywords" content="Louis,Solofrizzo,Ne02ptzero,illuminati">\n			<meta charset="utf-8">\n			<title>Louis</title>\n	</head>\n	<body>\n		<div id="contact">\n			<h1>Louis</h1>\n			<a href="https://github.com/ne02ptzero/"><i class="fa fa-github"></i></a>\n			<a href="http://twitter.com/ne02ptzero"><i class="fa fa-twitter"></i></a>\n			<a href="cv.pdf"><i class="fa fa-file-pdf-o"></i></a><br /><br />\n			<a class="mail" href="mailto:louis@ne02ptzero.me">louis@ne02ptzero.me</a>\n		</div>\n	</body>\n</html>\n<!-- ^^^^^ Website of the year. ^^^^^^ ^2000-->\n<!-- Wait, you can\'t see it ! ^500-->\n<!-- Give me a minute ... -->'
];

var html2 = ["\n<!-- Muuuuch better. ^2000What a beautiful site. ^1500Could use some more style though. -->"];

var o_html = '<h1>Louis</h1><a href="https://github.com/ne02ptzero/"><i class="fa fa-github"></i></a><a href="http://twitter.com/ne02ptzero"><i class="fa fa-twitter"></i></a><a href="cv.pdf"><i class="fa fa-file-pdf-o"></i></a><br /><br /><a class="mail" href="mailto:louis@ne02ptzero.me">louis@ne02ptzero.me</a>';

var file = '#include <netinet/in.h>\n#include <sys/socket.h>\n#include <sys/stat.h>\n#include <sys/types.h>\n#include <unistd.h>\n#include <stdlib.h>\n#include <fcntl.h>\n#include <stdio.h>\n#include <string.h>\n\nint		main(void) {\n	int				c_sock, n_sock, bufsize = 1024, fd;\n	socklen_t			addrlen;\n	char				*buffer = malloc(bufsize * sizeof(char)), str[65];\n	struct sockaddr_in		addr;\n	struct stat			stat_buf;\n\n	if ((c_sock = socket(AF_INET, SOCK_STREAM, 0)) == -1 || !buffer) { return 1; }\n	addr.sin_family = AF_INET; addr.sin_addr.s_addr = INADDR_ANY; addr.sin_port = htons(80);\n	if (bind(c_sock, (struct sockaddr *)&addr, sizeof(addr)) != 0) { return 1; }\n	while (1) {\n		if (listen(c_sock, 10) < 0) { return 1; }\n		fd = open("index.html", O_RDONLY);\n		if ((n_sock = accept(c_sock, (struct sockaddr *)&addr, &addrlen)) < 0 || fd == -1) { return 1; }\n		recv(n_sock, buffer, bufsize, 0);\n		fstat(fd, &stat_buf);\n		sprintf(str, "HTTP/1.1 200 OK\\nContent-length: %d\\nContent-type: text/html\\n\\n", stat_buf.st_size);\n		write(n_sock, str, strlen(str));\n		if (sendfile(n_sock, fd, NULL, stat_buf.st_size) == -1) { return 1; }\n		close(n_sock);\n		close(fd);\n	}\n	close(c_sock);\n	free(buffer);\n	return 0;\n}';

var css1 = ["/* Let's begin by the basics */\n\n\nhtml {\n	text-align: center;\n	background: #1E1E20;\n	color: rgba(222, 209, 169, 1);\n	font-family: 'Open Sans', sans-serif;\n	font-size: 1.3em;\n}\n"];

var css2 = ["/* Not so bad. Let's make a few changes. */\n\nh1 {\n	margin-top: 15%;\n	margin-bottom: 3%;\n	font-size: 3.5em;\n}\n\na {\n	text-decoration: none;\n	color: #374140;\n	transition-property: all;\n	transition-duration: 0.3s;\n}\n\na:hover {\n	color: #DC3522;\n}\n\na i {\n	font-size: 2em;\n	margin-right: 1%;\n	margin-left: 1%;\n}"];

var css3 = ["\n/* Well, we're done. Till' next refresh, see you. */"];
