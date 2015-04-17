$(document).ready(function() {
	initBase();
	initHorizontalBarChart();
	initVerticalBarChart();
	initDonutChart();
	initPieChart();
	initLineChart();
	initAreaChart();
	initSliders();
	initKutaRedactor();
	initMyMaps();
	initFormAddOns();
});
function initBase(){
	$('.bottom_tooltip').tooltip({
		placement: 'bottom'
	});
	$('.left_tooltip').tooltip({
		placement: 'left'
	});
	$('.right_tooltip').tooltip({
		placement: 'right'
	});
	$('.top_tooltip').tooltip();
	
	$('.alert-message a.close').live('click', function(){
		$(this).parent().parent('.c-alert').slideUp('slow');
	});
	$('.dropdown-menu').click(function(event){
		event.stopPropagation();
	});
	$('.carousel').carousel();
	$('.accordion-body.collapse.in').prev('.accordion-heading').addClass('acc-active');
	$('.accordion-heading').live('click', function(){
		$('.accordion-heading').removeClass('acc-active');
		$(this).addClass('acc-active');
	});
	$(".fancy").uniform();
}
function initHorizontalBarChart(){
	if (document.getElementById('horizontal-bar-div')) {
		var nilai = eval($('#horizontal-bar-div').attr('data-value'));
		var warna = eval($('#horizontal-bar-div').attr('data-colors'));
		var penanda = eval($('#horizontal-bar-div').attr('data-labels'));
		
		var plot2 = $.jqplot('horizontal-bar-div', nilai, {			
			seriesColors: warna,
			seriesDefaults: {
				renderer:$.jqplot.BarRenderer,
				pointLabels: { show: true, location: 'e', edgeTolerance: -15 },	
				rendererOptions: {						
					barPadding: 0,
					barMargin: 10,
					barDirection: 'horizontal',
					barWidth: null,
					shadowOffset: 0,
					shadowDepth: 3,
					shadowAlpha: 0.6
				}
			},
			series:penanda,
			grid: {
				borderWidth: 0,
				gridLineColor: '#cdcdcd',
				background: 'transparent',
				shadow: false
			},
			legend: {
				show: true,
				placement: 'insideGrid',
				location: 'ne'
			},
			axes: {
				yaxis: {
					renderer: $.jqplot.CategoryAxisRenderer
				}
			}
		});
		$(window).resize(function() {
			if (plot2) {
				$.each(plot2.series, function(index, series) {
					series.barWidth = undefined;
				});
				plot2.replot();
			}
		});
	}
}
function initVerticalBarChart(){
	if (document.getElementById('vertical-bar-div')) {
		var s1 = eval($('#vertical-bar-div').attr('data-value'));
		var ticks = eval($('#vertical-bar-div').attr('data-ticks'));
		var warna = eval($('#vertical-bar-div').attr('data-colors'));
		var penanda = eval($('#vertical-bar-div').attr('data-labels'));
		 
		var plot1 = $.jqplot('vertical-bar-div', s1, {
			seriesColors: warna,
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				rendererOptions: {
					fillToZero: true,
					barPadding: 0,
					barMargin: 10,
					barWidth: null,
					shadowOffset: 0,
					shadowDepth: 3,
					shadowAlpha: 0.6
				}
			},
			series:penanda,
			grid: {
				borderWidth: 0,
				gridLineColor: '#cdcdcd',
				background: 'transparent',
				shadow: false
			},
			legend: {
				show: true,
				placement: 'insideGrid',
				location: 'nw'
			},
			axes: {
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer,
					ticks: ticks
				},
				yaxis: {
					pad: 1.05,
					tickOptions: {formatString: '$%d'}
				}
			}
		});
		$(window).resize(function() {
			if (plot1) {
				$.each(plot1.series, function(index, series) {
					series.barWidth = undefined;
				});
				plot1.replot();
			}
		});
	}
}
function initDonutChart(){
	if (document.getElementById('donut-pie-div')) {
	  var s1 = eval($('#donut-pie-div').attr('data-value'));
	  var s2 = eval($('#donut-pie-div').attr('data-value2'));
	  var warna = eval($('#donut-pie-div').attr('data-colors'));
	   
	  var plot3 = $.jqplot('donut-pie-div', [s1,s2], {
		seriesColors: warna,
		seriesDefaults: {
			renderer:$.jqplot.DonutRenderer,
			rendererOptions:{
				sliceMargin: 1,
				innerDiameter: 30,
				startAngle: -90,
				showDataLabels: true,
				shadowOffset: 3,
				shadowDepth: 1,
				shadowAlpha: 0.1,
				dataLabels: 'value'
			}
		},
		grid: {
			borderWidth: 0,
			gridLineColor: '#cdcdcd',
			background: 'transparent',
			shadow: false		
		},
		legend: {
			//show: true
		}
	  });
		$(window).resize(function() {
			if (plot3) {
				plot3.replot();
			}
		});
	}
}
function initPieChart(){
	if (document.getElementById('pie-div')) {
	  var data = eval($('#pie-div').attr('data-content'));
	  var dataColors = eval($('#pie-div').attr('data-colors'));
	  var plot1 = jQuery.jqplot ('pie-div', [data], 
		{
		seriesColors: dataColors,
		  seriesDefaults: {
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: {
			  showDataLabels: true
			}
		  }, 
		  legend: { show:true, placement: 'insideGrid', location: 'e' },
			grid: {
				borderWidth: 0,
				gridLineColor: '#cdcdcd',
				background: 'rgba(255,255,255,0.1)',
				shadow: false		
			}
		}
	  );
	}
}
function initLineChart(){
	if (document.getElementById('line-chart-div')) {
	  var cosPoints = eval($('#line-chart-div').attr('data-content'));
	  var judul = $('#line-chart-div').attr('data-title');
	  var warna = eval($('#line-chart-div').attr('data-colors'));
	 
	  var plot3 = $.jqplot('line-chart-div', cosPoints, 
		{ 
		  title:judul,
			grid: {
				borderWidth: 0,
				gridLineColor: '#cdcdcd',
				background: 'rgba(255,255,255,0.1)',
				shadow: false		
			},
			seriesColors: warna
		}
	  );
    }
}
function initAreaChart(){
	if (document.getElementById('area-chart-div')) {
		var ab = eval($('#area-chart-div').attr('data-content'));
		var warna = eval($('#area-chart-div').attr('data-colors'));
		var dataFill = $('#area-chart-div').attr('data-fill').split('|');
		var dataFillColor = $('#area-chart-div').attr('data-fill-color');
		 
		var plot1 = $.jqplot("area-chart-div", ab, {
			axesDefaults: {
				pad: 1.05
			},
			fillBetween: {
				series1: Number(dataFill[0]),
				series2: Number(dataFill[1]),
				color: dataFillColor,
				baseSeries: Number(dataFill[2]),
				fill: true
			},
			grid: {
				borderWidth: 0,
				gridLineColor: '#cdcdcd',
				background: 'rgba(255,255,255,0.1)',
				shadow: false		
			},
			seriesColors: warna,
			seriesDefaults: {
				rendererOptions: {
					smooth: true
				}
			}
		});
	}
}
function initSliders(){
	$( "#eq1 > div" ).each(function() {
		var value = parseInt( $(this).attr('rel'), 10 );
		$( this ).slider({
			value: value,
			range: "min",
			animate: true,
			orientation: "horizontal"
		});
	});
	
	$( "#eq2 > span" ).each(function() {
		// read initial values from markup and remove that
		var value = parseInt( $( this ).text(), 10 );
		$( this ).empty().slider({
			value: value,
			range: "min",
			animate: true,
			orientation: "vertical"
		});
	});
	if (document.getElementById('slider-range')) {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	}
}
function initKutaRedactor(){
	$( ".fullRedactor" ).each(function(){
		$(this).redactor();
	});
	$( ".statusRedactor" ).each(function(){
		$(this).redactor({
			buttons: ['image', 'video', 'file', 'link']
		});
	});
	$( ".commentRedactor" ).each(function(){
		$(this).redactor({
			buttons: ['bold', 'italic']
		});
	});
}
function initMyMaps(){
	if (document.getElementById('map1')) {
		$('#map1').jMapping();
	}
	if (document.getElementById('map2')) {
		$('#map2').jMapping();
	}
}

function initFormAddOns(){
	$( ".cselect" ).each(function(){
		$(this).chosen();
	});
	$( ".chzn-select-deselect" ).each(function(){
		$(this).chosen({allow_single_deselect:true});
	});
	
	$( ".datePicker" ).each(function(){
		$(this).datepicker({
			format: 'mm-dd-yyyy'
		});
	});
	$('.timePicker').each(function(){
		$(this).timePicker({
		show24Hours: false,
		separator:'.',
		step: 5});
		$('.time-picker').width($(this).width()+12);
	});	
}