$(function () {
	function Line(obj){
		this.box = obj.find('.box');
		this.lib = obj.attr('for');
		this.btn = obj.find('.line-btn');

		if(obj.attr('mutable')){
			this.box.append("<a href='#' class='mute'>Mute</a>");
			this.muteBtn = $("a", this.box);
		}

		this.title = $(".title", obj).html();
		this.id = obj.attr('line');		
		this.ford = obj.attr('for');		
		this.conj = obj.attr('conj');		
	}

	Line.prototype.create = function(event){
		var i, 
			width = this.box.parent().width() - 10;

		if(event.constructor && event.constructor.name === "Array"){
			event = "["+event.join(", ")+"]";
		}

		this.box.append(("<i>"+event+"</i>").slice(0,64));

		i = $("i", this.box);
		i = $(i[i.length-1]);

		i.animate({
			right: width - 50
		}, {
			easing: "linear",
			duration : 4000, 
			complete: function(){
				i.fadeOut(100, function(){
					i.remove();
				});
			}
		});
	}

	var lc = $('.field.l').stream('click'), rc = $('.field.r').stream('click');

	var lines = {};
	var buses = {
		simple : function(stream){
			return stream;
		},
		hello : function(stream){
			return stream.map('hello');
		},
		warden : function(stream){
			return stream.map('Warden!');
		},
		map : function(stream){
			return stream.map('value');
		},
		mapp : function(stream){
			return stream.map('.clientX');
		},
		mapf : function(stream){
			return stream.map(".toString()");
		},
		mapa : function(stream){
			debugger;
			return stream.map(['a', 'b']).nth(-1);
		},
		mapcp : function(stream){
			return stream.map("@width");
		},
		mapcf : function(stream){
			return stream.map("@width()");
		},
		fvl : function(stream){
			return stream.map(function(){return Math.random()*100>>0; }).filter(function(e){return e > 50});
		},
		sta : function(stream){
			return stream.map('red').skip(3).take(3);
		},
		unique : function(stream){
			return stream.map('.clientX').unique()
		},
		eql : function(stream){
			return stream.map(function(){return Math.round(Math.random())}).equals(1)
		},
		red :  function(stream){
			return buses.rc = stream.map('red');
		},
		blue :  function(stream){
			return buses.bc = stream.map('blue');
		},
		merged :  function(stream){
			return buses.rc.merge(buses.bc);
		},

		red2 :  function(stream){
			return buses.rc2 = stream.map('red');
		},
		blue2 :  function(stream){
			return buses.bc2 = stream.map('blue');
		},
		synced :  function(stream){
			return buses.rc2.sync(buses.bc2);
		},

		red3 :  function(stream){
			return buses.rc3 = stream.map('red');
		},
		org :  function(stream){
			return buses.orag = stream.map('orange');
		},
		blue3 :  function(stream){
			return buses.bc3 = stream.map('blue');
		},
		syncedf1 :  function(stream){
			return buses.rc3.sync(buses.bc3.sync(buses.orag));
		},
		syncedf :  function(stream){
			return buses.rc3.syncFlat(buses.bc3.sync(buses.orag));
		},



		geta : function(stream){
			return stream.map({
				parent: {
					child: {
						array : [null, {direct: 'Hello!'}]
					}
				}
			}).get('parent/child/array/[1]/direct');
		}
	};

	$('.line').each(function(){
		var line = new Line($(this)),
			stream;
			stream = buses[line.id](line.btn.stream('click'));
			stream.listen(function(event){
				line.create(event);
			});

			if(line.conj){
				

				buses[line.id]($("[for='"+line.conj+"']").stream('click')).listen(function(e){
					line.create(e)
				});
				
			}
		
		}
		
	);

});